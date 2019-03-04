import {DELETE_COMMENT_FROM_FRESH_COMMENTS} from './actionTypes'

export const createDeleteCommentFromFreshCommentsAction = (value) => ({
    type: DELETE_COMMENT_FROM_FRESH_COMMENTS,
    value
})