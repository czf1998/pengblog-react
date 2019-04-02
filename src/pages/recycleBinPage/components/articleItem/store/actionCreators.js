import {RECOVER_ARTICLE_deletedArticleItem_saga} from './actionTypes'

export const createRecoverArticleAction = (value) => ({
    type: RECOVER_ARTICLE_deletedArticleItem_saga,
    value
})