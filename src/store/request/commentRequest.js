import * as Api from '../apiConstant'
import axios from 'axios'
import {getToken} from "./articleRequest";

export function SubmitCommentData(value) {
    let commentData = {
        comment_hostId: value.article_id,
        comment_referComment: value.referCommentId,
        visitor_name: value.visitorName,
        comment_content: value.commentContent,
        visitor_email: value.visitorEmail,
        visitor_siteAddress: value.visitorSiteAddress,
        comment_platform: navigator.platform,
        captchaId: value.captchaId,
        captchaCode: value.captchaCode
    }
    return axios.post(Api.API_POST_SUBMIT_COMMENT,commentData);
}


export function RequestSubCommentListData(value) {
    let config = {
        params: {
            comment_id: value.comment_id,
            startIndex: value.startIndex,
            pageScale: value.pageScale
        }
    }
    return axios.get(Api.API_GET_SUB_COMMENT_LIST, config)
}


export function RequestCountOfComment(value) {
    let config = {
        params: {
            article_id: value
        }
    }
    return axios.get(Api.API_GET_COUNT_OF_COMMENT, config)
}

export function RequestTopLevelCommentListData(value) {
    let config = {
        params: {
            article_id: value.article_id,
            startIndex: value.startIndex,
            pageScale: value.pageScale
        }
    }
    return axios.get(Api.API_GET_TOP_LEVEL_COMMENT_LIST_BY_LIMITINDEX, config)
}

export function RequestFreshCommentListData(value){
    let config = {
        params: {
            startIndex: value.startIndex,
            pageScale: value.pageScale
        }
    }

    return axios.get(Api.API_GET_FRESH_COMMENT_LIST, config)

}

export function RequestDeleteComment(value) {

    let token = getToken()

    let config = {
        params: {
            comment_id: value
        },
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_DELETE_COMMENT, config)
}


export function CheckWetherNeedCaptcha() {

    return axios.get(Api.API_CHECK_WHETHER_NEED_CAPTCHA_TO_SUBMIT_COMMENT)

}
