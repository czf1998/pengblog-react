import * as Api from '../apiConstant'
import axios from 'axios'


export const RequestArticleListData = (startIndex, pageScale) => {
    let config = {
        params: {
            startIndex: startIndex,
            pageScale: pageScale
        }
    }
    return axios.get(Api.API_GET_ARTICLE_LIST_BY_LIMITINDEX, config)
}