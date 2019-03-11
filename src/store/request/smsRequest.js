import axios from "axios";
import * as Api from "../apiConstant";

export function RequestSms(value) {
    let config = {
        params: {
            phoneNumber: value
        }
    }
    return axios.get(Api.API_GET_SMS, config)
}
