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

export function RequestLiftedIP(value) {

    const token = getToken()

    let config = {
        params: {
            ip: value
        },
        headers: {
            Authorization: token
        }
    }
    return axios.get(Api.API_LIFTED_IP, config)
}


export function RequestIpList(value) {

    const token = getToken()

    let config = {
        params: value,
        headers: {
            Authorization: token
        }
    }
    return axios.get(Api.API_IP_LIST, config)

}