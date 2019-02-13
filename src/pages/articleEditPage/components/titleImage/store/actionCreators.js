import {APPOINT_TITLE_IMAGE_URL_BASE64,UPLOAD_TITLE_IMAGE,APPOINT_SIZE_OF_TITLE_IMAGE} from './actionTypes'

export const createAppointTitleImageUrlBase64Action = (value) => ({
    type: APPOINT_TITLE_IMAGE_URL_BASE64,
    value
})

export const createUploadTitleImageAction = (value) => ({
    type: UPLOAD_TITLE_IMAGE,
    value
})

export const createAppointSizeOfTitleImageFrameAction = (value) => ({
    type: APPOINT_SIZE_OF_TITLE_IMAGE,
    value
})