import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { GET_HOME_ARTICLE_LIST_DATA } from './actionTypesWithSaga'
import { API_GET_ARTICLE_LIST_BY_LIMITINDEX } from './apiConstant'
import axios from 'axios'

function* ajaxHomeArticleListData(action) {
    let config = {
        params: {
            startIndex: action.value.startIndex,
            pageScale: action.value.pageScale
        }
    }
    const res = yield axios.get(API_GET_ARTICLE_LIST_BY_LIMITINDEX, config)

    console.log(res)
}

function* mySaga() {
    yield takeEvery(GET_HOME_ARTICLE_LIST_DATA, ajaxHomeArticleListData);
}

export default mySaga;