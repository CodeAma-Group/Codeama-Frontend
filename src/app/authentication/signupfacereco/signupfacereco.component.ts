import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as faceapi from 'face-api.js';
import {  WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../_authServices/auth.service'
import { FaceauthService } from '../_authServices/faceauth.service'

@Component({
	selector: 'app-signupfacereco',
	templateUrl: './signupfacereco.component.html',
	styleUrls: ['./signupfacereco.component.css']
})
export class SignupfacerecoComponent implements OnInit {
	src
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

	constructor( private _router: Router,private _faceAuth: FaceauthService, private _authService: AuthService ) { }
	
	ngOnInit(): void {


		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri('/assets/weights'),
			faceapi.nets.faceLandmark68Net.loadFromUri('/assets/weights'),
			faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/weights'),
			faceapi.nets.faceExpressionNet.loadFromUri('/assets/weights')
		]).then(() => {
			faceapi.nets.faceRecognitionNet.loadFromUri('/assets/weights'),
			this.loading = false;
		}).catch(err => console.warn(err));
		
		WebcamUtil.getAvailableVideoInputs()
		.then((mediaDevices: MediaDeviceInfo[]) => {
			this.isCameraExist = mediaDevices && mediaDevices.length > 0;
		});

		this.startSignupProcess();
		document.getElementById("sample").style.display = "none";

	}

	startSignupProcess() {
		
		this.startProcessInterval = setInterval(() => {

			if (this.steps == 0) {
				if (this.showProcedureNotice) {
					this.showProcedureNotice = false;
					this.alertToStartGettingSamples = true;
					this.webcamImage = null;
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
	shotTaken: boolean = false;
	noFaceDetectedError: boolean = false;
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


	async handleImage(webcamImage: WebcamImage) {
		this.webcamImage = webcamImage;
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
					this.stepOne = false;
					clearInterval(this.startProcessInterval);
					clearInterval(this.stepIntervaTimer);
					clearInterval(this.stepInterval);
					this.uploadSuccess = true;
					this.shotTaken = true;

					var timer = 0; 
					var timingInterval = setInterval(() => {
						if (timer == 1) {							
							this.uploadSuccess = true;
						}
						timer = timer + 1;
						if (timer == 2) {
							clearInterval(timingInterval);
							
							if (this.usernameFilled && this.emailFilled && this.passwordFilled) {
								if (this.servererr) {
									this.servererr = false;
								}
								this.uploadSuccess = false;
								this.preparingUpload = true;

								var imageBlob = this.webcamImage.imageAsDataUrl;
								let image = new File([imageBlob], "profile.jpg", { type: "image/jpeg" });
								let imageToUpload = image

								let userData: FormData = new FormData();
								userData.append("faceRecognitionPicture", imageToUpload);
								userData.append("Username", this.username);							
								userData.append("Email", this.email);							
								userData.append("Password", this.password);							

								this.registerUser(userData);
							} else if (this.usernameFilled && this.emailFilled) {
								this.fieldErrorMsg = "please fill out the password";
							} else if (this.usernameFilled) {
								this.fieldErrorMsg = "Please fill out the email and password";
							} else if (this.usernameFilled && this.passwordFilled) {
								this.fieldErrorMsg = "Please fill out the email field";
							} else if (this.emailFilled && this.passwordFilled) {
								this.fieldErrorMsg = "Please fill out the username";
							} else if (this.emailFilled) {
								this.fieldErrorMsg = "Please fill the password and username";
							} else if (this.passwordFilled) {
								this.fieldErrorMsg = "Please fill the email and username";
							} else {
								this.fieldErrorMsg = "All fields should be filled";
							}
							
							if (!this.usernameFilled || !this.emailFilled || !this.passwordFilled) {
								this.uploadSuccess = false;
								this.fieldError = true;
							}			
							
						}
					}, 5000)


				} else {
					var timer = 0; 
					var timingInterval = setInterval(() => {
						if (timer == 1) {
							this.stepOne = false;
							this.noFaceDetectedError = false;
							this.steps = 0;
							this.showProcedureNotice = true;
							this.alertToStartGettingSamples = false;
							this.startCountDownToShot = false;
							this.getReadyToStartShot = false;
							this.isCamOn = true;
							this.webcamImage = null;
							clearInterval(this.startProcessInterval);
							clearInterval(this.stepIntervaTimer);
							clearInterval(this.stepInterval);
			
							this.startSignupProcess();							
						}
						timer = timer + 1;
						if (timer == 2) {
							clearInterval(timingInterval);
						}
					}, 10000)

					this.noFaceDetectedError = true;
				}
			})
		)
	}

	//user fields
	usernameFilled: boolean = false;
	emailFilled: boolean = false;
	passwordFilled: boolean = false;
	fieldError: boolean = false;
	fieldErrorMsg: string = '';
	preparingUpload: boolean = false;
	regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	invalidEmail: boolean = false;

	username: string = '';
	email: string = '';
	password: string = '';

	async recentValidCheck() {
		if (this.usernameFilled && this.emailFilled && this.passwordFilled) {
			this.fieldError = false;
		}

		if (this.usernameFilled && this.emailFilled && this.passwordFilled && this.shotTaken) {
			this.fieldError = false;
			if (this.servererr) {
				this.servererr = false;
			}
			this.uploadSuccess = false;
			this.preparingUpload = true;

			var imageBlob = this.webcamImage.imageAsDataUrl;
			let image = new File([imageBlob], "profile.jpeg", {type: "image/jpeg"});
			let imageToUpload = image;

			let userData: FormData = new FormData();
			userData.append("faceRecognitionPicture", imageToUpload);
			userData.append("Username", this.username);							
			userData.append("Email", this.email);							
			userData.append("Password", this.password);							

			this.registerUser(userData);
		}
	}

	imageToUpload: any;

	async getUsername(data: string) {
		this.username = data;
		this.usernameFilled = true;
		document.getElementById("floatingInput").blur();

		await this.recentValidCheck();
	}

	async getEmail(data: string) {
		const valid = this.regularExpression.test(String(data).toLowerCase());
		if (!valid) {
			this.fieldErrorMsg = "Invalid email address entered!";
		} else {
			this.email = data;
			this.fieldErrorMsg = "All fields should be filled out";
			this.emailFilled = true;
			document.getElementById("floatingInputEmail").blur();
			
			await this.recentValidCheck();
		}
	}

	async getPassword(data: string) {
		if (data.length < 6) {
			this.fieldErrorMsg = "Password should be atleast 6 characters.";
		} else {
			this.fieldErrorMsg = "All fields should be filled out."
			this.password = data;
			this.passwordFilled = true;
			document.getElementById("floatingPassword").blur();
			
			await this.recentValidCheck();
		}
	}

	servererr: boolean = false;
	serverError: string = '';

	async registerUser(data: object) {
		await this._authService.registerUser(data).subscribe(
			res => {
				this._router.navigate(['/auth/verifyemail']);
			},
			err => {
				this.preparingUpload = false;
				this.servererr = true;

				this.serverError = err.error;
				console.log(err)
			}
		);
	}

}