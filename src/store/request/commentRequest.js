import * as Api from '../apiConstant'
import axios from 'axios'

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
