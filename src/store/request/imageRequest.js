import * as Api from '../apiConstant'
import axios from 'axios'

export function UploadImage(value) {
    var form = new FormData()
    form.append('img',value)
    let config = {
        headers:{'Content-Type':'multipart/form-data'}
    }
    return axios.post(Api.API_POST_IMAGE,form,config);
}


