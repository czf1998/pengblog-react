import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { GET_HOME_ARTICLE_LIST_DATA, OBSERVE_SCROLL_TOP_OF_ELEMENT_EL } from './actionTypesWithSaga'
import { createDeliverArticleDataToHomeAction, createRecordScrollTopOfElementElAction } from './actionCreators'
import { ArticleRequest } from './request'


function* ajaxHomeArticleListData(action) {
    try{
        const res = yield ArticleRequest.RequestArticleListData(action.value.startIndex, action.value.pageScale)
        let nextAction = createDeliverArticleDataToHomeAction(res.data)
        yield put(nextAction)

    }catch (err) {
        console.log('ERR IN ACTION: GET_HOME_ARTICLE_LIST_DATA  ERR: ' + err)
    }
}

function* recordScrollTopOfElementEl(action) {
    let nextAction = createRecordScrollTopOfElementElAction(action.value)
    yield put(nextAction)
}

function* mySaga() {
    yield takeEvery(GET_HOME_ARTICLE_LIST_DATA, ajaxHomeArticleListData);
    yield takeLatest(OBSERVE_SCROLL_TOP_OF_ELEMENT_EL, recordScrollTopOfElementEl);
}

export default mySaga;