import axios from "axios";
import * as Api from "../apiConstant";
import {getToken} from "./articleRequest";

export function RequestBanIP(value) {

    const token = getToken()

    let config = {
        params: {
            ip: value
        },
        headers: {
            Authorization: token
        }
    }
    return axios.get(Api.API_BAN_IP, config)
}
