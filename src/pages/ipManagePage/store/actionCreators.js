import {GET_IP_LIST_DATA_OF_IP_MANAGE_PAGE_IPMANAGEPAGE_SAGA,TRIGGER_IS_LOADING} from './actionTypes'

export const createGetIpListDataOfManagePageAction = (value) => ({
    type: GET_IP_LIST_DATA_OF_IP_MANAGE_PAGE_IPMANAGEPAGE_SAGA,
    value
})

export const createTriggerIsLoadingAction = (value) => ({
    type: TRIGGER_IS_LOADING,
    value
})