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
	stepIntervaTimer: number = 10000;
	startProcessInterval: any;
	stepInterval: any;
	secondTimerInterval: any;
	isCamOn:boolean = true;

	constructor( private _faceAuth:FaceauthService ) { }
	
	ngOnInit(): void {
		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models'),
			faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models'),
			faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models'),
			faceapi.nets.faceExpressionNet.loadFromUri('/assets/models')
		]).then(() => {
			this.loading = false;
		}).catch(err => console.warn(err));
		
		this.startSignupProcess();
		document.getElementById("sample").style.display = "none";

	}

	startSignupProcess() {
		
		this.startProcessInterval = setInterval(() => {
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
					this.secondTimerInterval = setInterval(() => {
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
					}, 1000	)
				}

			}
			
			if (this.steps == 2) {
				this.stepOne = false;
			}		
	
		}, this.stepIntervaTimer)
		

		this.stepInterval = setInterval(() => {
			if (this.steps <= 9) {
				this.steps += 1;
				console.warn(this.steps);
			} else {
				clearInterval(this.stepInterval);
			}
		}, this.stepIntervaTimer)

	}

	//handling camera functions
	images: WebcamImage[] = [];
  	public webcamImage: WebcamImage = null;
	imageUpload: any;
	uploadSuccess = false;
	private trigger: Subject<void> = new Subject<void>();
	loading = true;
	container: any;
	noFaceDetectedError: boolean = false;


	async handleImage(webcamImage: WebcamImage) {
		this.webcamImage = webcamImage;
		// console.warn(webcamImage.imageAsDataUrl)
		this.images.push(webcamImage);
		this.isCamOn = false;
		this.checkIfSamplesHaveFaces();
	}

	triggerSnapshot(): void {
		this.trigger.next();
	}

	public get triggerObservable(): Observable<void> {
		return this.trigger.asObservable();
	}


	checkIfSamplesHaveFaces(): Promise<any> {
		const labels = ['Face match detected'];
		return Promise.all(
			labels.map(async () => {
				const img = await faceapi.fetchImage(`${this.webcamImage.imageAsDataUrl}`);
				const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 320 })).withFaceLandmarks().withFaceDescriptor();
				if (detections?.descriptor) {
					return this.uploadSuccess = true;
				} else {
					return this.noFaceDetectedError = true;
				}
			})
		)
	}


}