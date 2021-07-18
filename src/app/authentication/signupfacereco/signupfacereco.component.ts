import { Component, OnInit } from '@angular/core';

import * as faceapi from 'face-api.js';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { FaceauthService } from '../_authServices/faceauth.service'

@Component({
	selector: 'app-signupfacereco',
	templateUrl: './signupfacereco.component.html',
	styleUrls: ['./signupfacereco.component.css']
})
export class SignupfacerecoComponent implements OnInit {

	startRecognitionProcess: boolean = true;
	secs: number = 10;
	steps: number = 0;

	/**
	 * process to get signup sample faces of a user
	 * @param timeStamps
	 */
	showProcedureNotice: boolean = true;
	alertToStartGettingSamples: boolean = false;
	startCountDownToShot: boolean = false;
	getReadyToStartShot: boolean = false;
	stepOne: boolean = false;

	constructor( private _faceAuth:FaceauthService ) { }

	ngOnInit(): void {
		
		this._faceAuth.startProcess();
		this.startSignupProcess();

		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models'),
			faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models'),
			faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models'),
			faceapi.nets.faceExpressionNet.loadFromUri('/assets/models')
		]).then(() => {
			this.loading = false;
		}).catch(err => console.warn(err));
	}

	startSignupProcess() {
	
		setInterval(() => {
			if (this.steps == 0) {
				if (this.showProcedureNotice) {
					this.showProcedureNotice = false;
					this.alertToStartGettingSamples = true;
				}
			}
			
			if (this.steps == 1) {
				if (this.alertToStartGettingSamples) {
					this.alertToStartGettingSamples = false;
				}

				this.stepOne = true;
				this.startCountDownToShot = true;

				if (this.stepOne) {
					var shotNumber = 0;
					setInterval(() => {
						if (this.secs > 0) {
							this.secs -= 1;
						} else {
							this.startCountDownToShot = false;

							if (shotNumber == 0) {
								this.triggerSnapshot();
							}
							shotNumber += 1;
							return;
						}
					}, 1000)
				}

			}
			
			if (this.steps == 2) {
				this.stepOne = false;
				console.warn("gooooooo")
			}
			
			if (this.steps == 3) {
				console.warn("this is step 4");
			}
			
			if (this.steps == 4) {
				console.warn("this is step 5");
			}
			
			if (this.steps == 5) {
				console.warn("this is step 6");
			}
			
				
	
		},10000)
		

		setInterval(() => {
			if (this.steps <= 9) {
				this.steps += 1;
				console.warn(this.steps);
			} else {
				return console.warn("This signup process just ended!");
			}
		}, 10000)

	}

	//handling camera functions
	images: WebcamImage[] = [];
  	public webcamImage: WebcamImage = null;
	imageUpload: any;
	uploadSuccess = false;
	private trigger: Subject<void> = new Subject<void>();
	loading = true;
	matchFound = false;
	faceMatchScore = 0;
	processingResult = false;
	processingCompleted = false;
	container: any;
	loadedImageLabels: any;
	noFaceDetectedError = false;

	databaseUserBlobSamples: any;


	async handleImage(webcamImage: WebcamImage) {
		this.webcamImage = webcamImage;
		// console.warn(webcamImage.imageAsDataUrl)
		this.images.push(webcamImage);
		this.loadedImageLabels = await this.loadImageLabels();

		this.compareTriggers();
	}

	triggerSnapshot(): void {
		this.trigger.next();
	}

	public get triggerObservable(): Observable<void> {
		return this.trigger.asObservable();
	}

	loadImageLabels(): Promise<any> {
		const labels = ['Face match detected'];
		return Promise.all(
			labels.map(async label => {
				const descriptions = [];
				const img = await faceapi.fetchImage(`${this.webcamImage.imageAsDataUrl}`);
				const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 320 })).withFaceLandmarks().withFaceDescriptor();
				if (detections?.descriptor) {
					this.noFaceDetectedError = false;
					descriptions.push(detections.descriptor);

				} else {
					this.noFaceDetectedError = true;
				}
				return new faceapi.LabeledFaceDescriptors(label, descriptions)
			})
		)
	}


	async compareTriggers() {
		
		async function getFileFromUrl(url, name, defaultType = 'image/jfif'){
			const response = await fetch(url);
			const data = await response.blob();
			return new File([data], name, {
				type: response.headers.get('content-type') || defaultType,
			});
		}

		const file = await getFileFromUrl('http://localhost:4200/assets/face_detection_test/download.jfif', 'download.jfif');
		this.databaseUserBlobSamples = file;
		this.uploadSuccess = true;

		this.start(this.databaseUserBlobSamples);

	}
	
	async start(uploadedImage: any) {
		this.matchFound = false;
		this.faceMatchScore = 0;
		this.processingResult = true;
		this.processingCompleted = false;
		let image;
		let canvas;

		const labeledFaceDescriptors = this.loadedImageLabels;
		const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.5);

		image = await faceapi.bufferToImage(uploadedImage);
		canvas = faceapi.createCanvasFromMedia(image);
		const displaySize = { width: image.width, height: image.height };
		faceapi.matchDimensions(canvas, displaySize);

		const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions({ inputSize: 320 })).withFaceLandmarks().withFaceDescriptors();
		const resizedDetections = faceapi.resizeResults(detections, displaySize);
		const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
		results.forEach((result, i) => {
			if (result.label === 'Face match detected') {
				this.matchFound = true;
				this.faceMatchScore = Math.round((1 - result.distance) * 100);
			} else if (!this.matchFound && i === results.length - 1) {
				this.faceMatchScore = Math.round((1 - result.distance) * 100);				
			}
		});
		this.processingResult = false;
		this.processingCompleted = true;
	}

}
