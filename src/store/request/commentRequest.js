import * as Api from '../apiConstant'
import axios from 'axios'

export function RequestCommentListData(value) {
    let config = {
        params: {
            article_id: value.article_id,
            startIndex: value.startIndex,
            pageScale: value.pageScale
        }
    }
    return axios.get(Api.API_GET_COMMENT_LIST_BY_LIMITINDEX, config)
}
