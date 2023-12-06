import { Injectable } from '@angular/core';
import {
    HttpClient
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class UploadService {
    public responseData: any;

    constructor(private _htt: HttpClient) {}

    uploadImage(type: string, files: File[]){
        const formData: FormData = new FormData();
        formData.append('file', files[0], files[0].name);
        return this._htt.post(environment.API_URL + "/api/admin/media?type=" + type, formData);
    }
}