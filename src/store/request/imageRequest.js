import * as Api from '../apiConstant'
import axios from 'axios'
import {getToken} from "./articleRequest";

export function UploadImage(value) {
    var form = new FormData()
    form.append('img',value)

    let token = getToken()

    let config = {
        headers:{
            'Content-Type':'multipart/form-data',
            Authorization: token
        }
    }
    return axios.post(Api.API_POST_IMAGE,form,config);
}


