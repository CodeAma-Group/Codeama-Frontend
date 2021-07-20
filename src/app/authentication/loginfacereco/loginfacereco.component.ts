import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as faceapi from 'face-api.js';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { FaceauthService } from '../_authServices/faceauth.service'

@Component({
	selector: 'app-loginfacereco',
	templateUrl: './loginfacereco.component.html',
	styleUrls: ['./loginfacereco.component.css']
})
export class LoginfacerecoComponent implements OnInit {

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
	isCamOn: boolean = true;
	stepOne: boolean = false;

	secPhasing:number = 10000;
	stepsInterval: any;
	processInterval: any;
	triggerShotInterval: any;
	smileStage: boolean = false;

	constructor( private _faceAuth:FaceauthService, private _router: Router ) { }

	ngOnInit(): void {
		WebcamUtil.getAvailableVideoInputs()
		.then((mediaDevices: MediaDeviceInfo[]) => {
			this.isCameraExist = mediaDevices && mediaDevices.length > 0;
		});

		this._faceAuth.startProcess();
		this.startLoginProcess();

		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models'),
			faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models'),
			faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models'),
			faceapi.nets.faceExpressionNet.loadFromUri('/assets/models')
		]).then(() => {
			this.loading = false;
		}).catch(err => console.warn(err));
	}

	showWebcam = true;
	isCameraExist = true;

	errors: WebcamInitError[] = [];

	private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

	onOffWebCame() {
		this.showWebcam = !this.showWebcam;
	}

	handleInitError(error: WebcamInitError) {
		this.errors.push(error);
	}

	changeWebCame(directionOrDeviceId: boolean | string) {
		this.nextWebcam.next(directionOrDeviceId);
	}

	get nextWebcamObservable(): Observable<boolean | string> {
		return this.nextWebcam.asObservable();
	}

	async startLoginProcess() {
	
		this.processInterval = setInterval(() => {

			if (this.steps == 0) {
				if (this.showProcedureNotice) {
					this.showProcedureNotice = false;
					this.alertToStartGettingSamples = true;
				}

				if (this.noFaceDetectedError) {
					this.noFaceDetectedError = false;
					this.passwordSet = true;
					this.smileStage = true;
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
					this.triggerShotInterval = setInterval(() => {
						if (this.secs > 0) {
							this.secs -= 1;
						} else {
							this.startCountDownToShot = false;

							if (shotNumber == 0) {
								this.smileStage = false;
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
			}		
	
		}, this.secPhasing)
		

		this.stepsInterval = setInterval(() => {
			if (this.steps <= 9) {
				this.steps += 1;
			} else {
				return;
			}
		}, this.secPhasing)

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
	userPasswordSpecified: boolean = false;

	databaseUserBlobSamples: any;
	recoPhaseFailed: boolean = false;
	notMatchingOurData: boolean = false;
	realStage: boolean = false;


	async handleImage(webcamImage: WebcamImage) {
		this.webcamImage = webcamImage;
		// console.warn(webcamImage.imageAsDataUrl)
		document.getElementById("cam").style.display = "none";
		await this.images.push(webcamImage);
		document.getElementById("scanner").style.display = "block";
		this.isCamOn = false;

		if (this.userPasswordSpecified) {
			this.userPasswordSpecified = false;			
			this.uploadSuccess = true;
			
			this.compareTriggers();	
			this.loadedImageLabels = await this.loadImageLabels();
			
		} else {
			this.recoPhaseFailed = true;
			this.secPhasing = 0;
			this.userPasswordSpecified = false;			
			this.loadedImageLabels = await this.loadImageLabels();
			this.compareTriggers();	
			return;
		}

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
					return this.noFaceDetectedError = true;
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

		this.start(this.databaseUserBlobSamples);

	}
	
	async start(uploadedImage: any) {
		this.matchFound = false;
		this.faceMatchScore = 0;
		this.stepOne = false;
		this.uploadSuccess = true;
		
		if (this.userPassword != '') {
			this.uploadSuccess = false;
			this.passwordSet = false;
			this.uploadSuccess = false;
			this.userPasswordSpecified = false;
			if (!this.noFaceDetectedError) {
				clearInterval(this.processInterval);
				clearInterval(this.stepsInterval);
				clearInterval(this.triggerShotInterval);

				this.uploadSuccess = false;
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
						
						return this.compareFaces(this.faceMatchScore); 
						
					} else if (!this.matchFound && i === results.length - 1) {
						this.faceMatchScore = Math.round((1 - result.distance) * 100);
						return this.compareFaces(this.faceMatchScore);
					}
				});
				this.processingResult = false;
				this.processingCompleted = true;
	
			} else {
				this.noFaceDetectedError = true;
				this.realStage = true;
				this.uploadSuccess = false;
				this.steps = 0;
				document.getElementById("cam").style.display = "block";
				document.getElementById("scanner").style.display = "none";
				this.webcamImage = null;
				this.isCamOn = true;
				this.secPhasing = 0;
				this.userPasswordSpecified = false;
				this.passwordSet = true;

				var turnToRepeatStage = 0;
				let turnRepeatStageInterval = setInterval(() => {
					if (turnToRepeatStage == 0) {
						return;
					} else {
						this.startLoginProcess();
					}
					turnToRepeatStage += 1;
				}, 5000)
				if (turnToRepeatStage == 1) {
					clearInterval(turnRepeatStageInterval);
				}
				return; 
			}
		
		} else {
			this.userPasswordSpecified = true;
			this.uploadSuccess = false;
			this.recoPhaseFailed = true;		
			return;
		}
		
	}

	compareFaces(matchscore) {
		this.passwordSet = true;
		if (matchscore > 65) {
			this._router.navigate(['/welcome']);
		} else if (matchscore < 65) {
			this.notMatchingOurData = true;

			var beginLoginProcess = 0;
			setInterval(() => {
				if (beginLoginProcess != 0) {	
					window.location.reload();
				}
				beginLoginProcess = beginLoginProcess += 1;
			}, 8000)

		} else {
			return;
		}

	}

	//password collecting
	userPassword: string = '';
	passwordSet: boolean = false;

	async submitPassword(data: string) {
		document.getElementById('floatingPassword').blur();
		if (this.recoPhaseFailed) {
			this.recoPhaseFailed = false;
			this.getUserData(data);		
			this.userPasswordSpecified = false;
			this.secPhasing = 10000;
			this.passwordSet = true;
			this.loadedImageLabels = await this.loadImageLabels();
			this.compareTriggers();	
			
		} else {
			this.getUserData(data);		
			this.passwordSet = true;
			this.userPasswordSpecified = false;
		}
	}

	getUserData(data: string) {
		this.userPassword = data;
	}


}
