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

export const RequestDraftData = () => {
    return axios.get(Api.API_GET_DRAFT)
}

export const SaveArticle = (value) => {
    return axios.post(Api.API_SAVE_ARTICLE,value)
}

export const RequestArticleFilingData = () => {
    return axios.get(Api.API_GET_ARTICLE_FILING)
}

export const RequestArticleLabelData = () => {
    return axios.get(Api.API_GET_ARTICLE_LABEL)
}

export const RequestArticleListDataByKeyWord = (value) => {

    let config = {
        params: {
            startIndex: value.startIndex,
            pageScale: value.pageScale,
            searchString: value.keyWord
        }
    }

    return axios.get(Api.API_GET_ARTICLE_LIST_BY_SEARCH, config)
}

export const RequestArticleListDataByFiling = (value) => {

    let config = {
        params: {
            startIndex: value.startIndex,
            pageScale: value.pageScale,
            selectedYear: value.selectedYear,
            selectedMonth: value.selectedMonth
        }
    }

    return axios.get(Api.API_GET_ARTICLE_LIST_BY_FILING, config)
}

export const RequestArticleListDataByLabel = (value) => {
    let config = {
        params: {
            startIndex: value.startIndex,
            pageScale: value.pageScale,
            article_label: value.article_label
        }
    }

    return axios.get(Api.API_GET_ARTICLE_LIST_BY_LABEL, config)
}

export const RequestDeleteArticle = (value) => {

    let config = {
        params: {
            article_id: value
        }
    }

    return axios.get(Api.API_DELETE_ARTICLE, config)
}