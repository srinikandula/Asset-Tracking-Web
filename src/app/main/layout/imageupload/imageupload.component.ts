import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Dimensions, ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiUrls} from '../../../schemas/apiUrls'
import {ModalManager} from 'ngb-modal';
import {ApiServiceService} from '../../../services/api-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  file: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  @ViewChild('myModal') myModal: any;
  @ViewChild('myModal2') myModal2: any;
  private modalRef: any ='';
  private vehicleMasterId: any;
  fileData: any;
  fileName: any;
  public vehicleMaster = {
    attrs: {
      pollutionUploadUrl: '',
      fitnessUploadUrl: '',
      roadTaxUploadUrl: '',
      insuranceUploadUrl: '',
      rcUploadUrl: '',
      reSecondUploadUrl: '',
    },
    pollutionUploadInfoFile: '',
  };

  @Input() imageType = '';
  @Output() imageToEmit = new EventEmitter<object>();
  constructor(private router: Router,
              private actRoute: ActivatedRoute,
              private apiUrls: ApiUrls,
              private modelService: ModalManager,
              private apiService: ApiServiceService,
              private ngModalService: NgbModal) {
    // this.vehicleMasterId = this.actRoute.snapshot.params.vehicleMasterId || '';
  }

  ngOnInit(): void {
  }
  fileChangeEvent(event: any): void {
    this.fileData = event.target.files;
    this.fileName = event.target.files[0].name;
    this.imageChangedEvent = event;
    this.ngModalService.open(this.myModal, {size: 'xl', keyboard: false});
  }

  dataURItoBlob(imageURI: any) {
    const binary = window.atob(imageURI.split(',')[1]);
    const mimeString = imageURI.split(',')[0].split(':')[1].split(';')[0];
    const array = [];
    let i;
    for (i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mimeString});
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    if (event.base64) {
      const blob = this.dataURItoBlob(event.base64);
      const imageFormat = event.base64.split(':')[1].split('/')[1].split(';')[0];
      const mimeString = event.base64.split(',')[0].split(':')[1].split(';')[0];
      const imageName = this.fileName.split('.')[0];
      this.file = new File([blob], imageName + '.' + imageFormat, {type: mimeString});
    }
  }

  imageLoaded(): void {
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions): void {
  }

  loadImageFailed(): void {
  }

  rotateLeft(): void {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight(): void {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate(): void {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

  flipHorizontal(): void {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical(): void {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage(): void {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut(): void {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn(): void {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio(): void {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation(): void {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  uploadImage(event: any): void {
    this.imageToEmit.emit({imageData: event, uploadName: this.imageType});
    this.ngModalService.dismissAll();
    // if (!this.croppedImage) {
    //     // swal.fire('Error', 'Please select file', 'error');
    // } else {
    //     let subUrl = '';
    //     switch (this.imageType) {
    //         case 'insurancePic':
    //             subUrl = 'api/v1/vehicle/uploadInsurancePolicy/?' + '&vehicleId=';
    //             this.insuranceUploadInfoFile = this.croppedImage;
    //             break;
    //         case 'rcUploadPic':
    //             subUrl = 'api/v1/vehicle/uploadRc/?' + '&vehicleId=';
    //             this.rcUploadInfoFile = this.croppedImage;
    //             break;
    //         case 'fitnessPic':
    //             subUrl = 'api/v1/vehicle/uploadFitnessCopy/?' + '&vehicleId=';
    //             this.fitnessUploadInfoFile = this.croppedImage;
    //             break;
    //         case 'roadTaxPic':
    //             subUrl = 'api/v1/vehicle/uploadRoadTax/?' + '&vehicleId=';
    //             this.roadTaxUploadInfoFile = this.croppedImage;
    //             break;
    //         case 'pollutionPic':
    //             subUrl = 'api/v1/vehicle/uploadPollutionExpiryCopy/?' + '&vehicleId=';
    //             this.pollutionUploadInfoFile = this.croppedImage;
    //             break;
    //     }
    //     subUrl = subUrl + this.vehicleMasterId;
    //     if (this.fileData, subUrl, this.imageType, this.croppedImage) {
    //         const file = this.fileData[0];
    //         // this.vehicleMaster.attrs.pollutionUploadUrl = this.croppedImage;
    //         this.apiService.upload(subUrl, file, base64ToFile(this.croppedImage)).subscribe((res: any) => {
    //             if (res) {
    //                 this.imageChangedEvent = res;
    //                 this.vehicleMaster.attrs.pollutionUploadUrl = res.url;
    //             }
    //         });
    //     }
    // }
  }

  // onClick(event): void {
  //     this.imageChangedEvent = event;
  //     this.modalRef = this.modelService.open(this.myModal2);
  // }

  sendData(event: any): void {
    this.imageToEmit.emit(event);
  }
  close(): void {
    this.ngModalService.dismissAll();
  }

}
