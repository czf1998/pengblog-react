import { fromJS } from 'immutable'
import { APPEND_EMOJI_TO_COMMENT_CONTENT} from "../components/emojiPicker/store";
import { TRIGGER_SHOW_EMOJIPICKER, REFRESH_COMMENT_CONTENT } from './actionType'

const defaultState = fromJS({
    showEmojiPicker: false,
    commentContent: ''
})

export default (state = defaultState, action) => {

    if(action.type === TRIGGER_SHOW_EMOJIPICKER){
        return state.merge({
            showEmojiPicker: !state.get('showEmojiPicker')
        })
    }

    if(action.type === REFRESH_COMMENT_CONTENT){
        return state.merge({
            commentContent: action.value
        })
    }

    if(action.type === APPEND_EMOJI_TO_COMMENT_CONTENT){
        return state.merge({
            commentContent: state.get('commentContent') + action.value
        })
    }
    return state
}