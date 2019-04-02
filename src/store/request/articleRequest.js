import * as Api from '../apiConstant'
import axios from 'axios'



export function RequestArticleData(article_id) {

    window.axiosSource = axios.CancelToken.source();
    window.currentArticleGetting = article_id

    let config = {
        cancelToken: window.axiosSource.token,
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
    let token = getToken()

    let config = {
        headers:{
            Authorization: token
        }
    }
    return axios.get(Api.API_GET_DRAFT,config)
}

export const SaveArticle = (value) => {

    let token = getToken()

    let config = {
        headers:{
            Authorization: token
        }
    }

    return axios.post(Api.API_SAVE_ARTICLE,value,config)
}

export const RequestArticleFilingData = () => {
    return axios.get(Api.API_GET_ARTICLE_FILING)
}

export const RequestArticleLabelData = () => {
    return axios.get(Api.API_GET_ARTICLE_LABEL)
}

export const RequestArticleListDataBykeyword = (value) => {

    let config = {
        params: {
            startIndex: value.startIndex,
            pageScale: value.pageScale,
            searchString: value.keyword
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

    let token = getToken()

    let config = {
        params: {
            article_id: value
        },
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_DELETE_ARTICLE, config)
}

export const RequestDeleteArticleList = (value) => {

    let token = getToken()

    let deleteArticleListData = {
        articleIdListString: JSON.stringify(value)
    }

    let config = {
        headers: {
            Authorization: token
        }
    }

    return axios.post(Api.API_DELETE_ARTICLE_LIST, deleteArticleListData, config)

}

export const RequestRecoverArticle = (value) => {
    let token = getToken()

    let config = {
        params: {
            article_id: value
        },
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_RECOVER_ARTICLE, config)
}

export const RequestDeletedArticleListData = (value) => {

    let token = getToken()

    let config = {
        params: value,
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_GET_DELETED_ARTICLE_LIST, config)

}


export const RequestDestroyAllArticleDeleted = () => {

    let token = getToken()

    let config = {
        headers: {
            Authorization: token
        }
    }

    return axios.get(Api.API_DESTROY_ALL_DELETED_ARTICLE, config)

}

export const getToken = () => {
    let tokenObj = JSON.parse(localStorage.getItem('token'))
    let token = tokenObj ? tokenObj.token : null
    return token
}