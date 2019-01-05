import {GET_HOME_ARTICLE_LIST_DATA } from '../../../store/actionTypesWithSaga'
import {TRIGGER_HAS_BEEN_MOUNT_ONCE} from './actionType'

export const createTriggerHasBeenMountOnce = () => ({
    type: TRIGGER_HAS_BEEN_MOUNT_ONCE
})


export const createGetHomeDataAction = (value) => ({
    type: GET_HOME_ARTICLE_LIST_DATA,
    value
})

