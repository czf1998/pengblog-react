import {GET_HOME_ARTICLE_LIST_DATA, PUSH_PROGRASS_TO_END} from '../../../store/actionTypesWithSaga'
import {TRIGGER_HAS_BEEN_MOUNT_ONCE,TRIGGER_ISLOADING_HOME_ARTICLE_LIST} from './actionType'

export const createPushPrograssToEndAction = (value) => ({
    type: PUSH_PROGRASS_TO_END,
    value
})

export const createTriggerHasBeenMountOnce = () => ({
    type: TRIGGER_HAS_BEEN_MOUNT_ONCE
})

export const createGetHomeDataAction = (value) => ({
    type: GET_HOME_ARTICLE_LIST_DATA,
    value
})

export const createTriggerIsLoadingHomeArticleListAction = (value) => ({
    type: TRIGGER_ISLOADING_HOME_ARTICLE_LIST,
    value
})

