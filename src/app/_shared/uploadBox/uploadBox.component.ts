import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CurdcommonserviceService, AuthenticationService } from '../../_services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-uploadbox',
    templateUrl: './uploadBox.component.html',
    styleUrls: ['./uploadBox.component.scss'],
})
export class UploadboxComponent implements OnInit {
    public config: any;
    public demoForm: any;
    public uploadCrypto: any;
    public submitted: boolean = false;

    constructor(
        private commonService: CurdcommonserviceService, private authenticationService: AuthenticationService,
        public notification: ToastrManager, private router: Router,
        private dialogRef: MatDialogRef<UploadboxComponent>, @Inject(MAT_DIALOG_DATA) data
    ) {
        this.config = data;
    }

    public ngOnInit(): void {

        const uploadValidation = [Validators.required];
        if (this.config.min && this.config.max) {
            uploadValidation.push(FileUploadValidators.sizeRange({
                minSize: this.config.min,
                maxSize: this.config.max,
            }));
        }
        if (this.config.limit) {
            uploadValidation.push(FileUploadValidators.filesLimit(this.config.limit));
        }

        const filesControl: any = new FormControl(null,
            uploadValidation);
        const fileName: any = new FormControl(null, Validators.required);
        this.demoForm = new FormGroup({
            files: filesControl,
        });
    }

    public submit(): void {
        this.submitted = true;
        if (this.demoForm.status === 'VALID') {
            const reader = new FileReader();
            const file = this.demoForm.value.files[0];
            reader.readAsDataURL(file);
            reader.onload = (data: any): void => {
                if (file.size > this.config.max) {
                    this.notification.errorToastr('Maximum File size 20MB.');
                    this.demoForm.value.files[0].name = '';
                } else if (file.type === 'application/ksettext/comma-separated-values' ||
                    file.type === 'application/excel' ||
                    file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                    file.type === 'application/kset' ||
                    file.type === 'application/kswps' ||
                    file.type === 'application/vnd.ms-excel' ||
                    file.type === 'application/ms-excel' ||
                    file.type === 'application/vnd.msexcel' ||
                    file.type === 'application/csv' ||
                    file.type === 'text/csv') {
                    this.uploadCrypto = reader.result;
                    const uploadDocument: object = {
                        uploadfilename: file.name,
                        uploadfiletype: file.type,
                        uploadurl: reader.result,
                    };
                    this.commonService.post(this.config.serviceURL, { upload_document: reader.result })
                        .subscribe(
                            details => {
                                setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
                                if (details.success) {
                                    this.notification.successToastr(this.config.title + ' Upload sucessfully');
                                    this.dialogRef.close();
                                    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
this.router.navigate([this.config.redirect]));
                                }
                            },
                            error => {
                                setTimeout(() => { this.authenticationService.loaderEnd(); }, 10);
                                const error_array = (JSON.parse(error));
                                const keys = Object.keys(error_array);
                                keys.forEach(element => {
                                    this.notification.errorToastr(error_array[element][0]);
                                });
                            });
                    // this.submitUpload.emit({ upload_note: this.demoForm.value.file_name, upload_document: uploadDocument });
                } else {
                    console.log('sdfsdhfkjh')
                    this.notification.errorToastr('Invalid file type.');
                    this.demoForm.value.files[0].name = '';
                }
            };
        }
    }

    public errorHandling = (control: string, error: string): any => {
        return this.demoForm.controls[control].hasError(error);
    }

    public cancel(): void {
        this.dialogRef.close();
    }

    private imageSizeConverion(bytes: number): string {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1000));

        return parseFloat((bytes / Math.pow(1000, i)).toFixed(2)) + ' ' + sizes[i];
    }

}
