import * as Api from '../apiConstant'
import axios from 'axios'

export function RequestArticleData(article_id) {
    let config = {
        params: {
            article_id: article_id
        }
    }
    return axios.get(Api.API_GET_ARTICLE_BY_ID, config)
}


export const RequestArticleListData = (value) => {
    let config = {
        params: {
            startIndex: value.startIndex,
            pageScale: value.pageScale
        }
    }
    return axios.get(Api.API_GET_ARTICLE_LIST_BY_LIMITINDEX, config)
}