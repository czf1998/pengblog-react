import { fromJS } from 'immutable'
import { APPEND_EMOJI_TO_COMMENT_CONTENT} from "../components/emojiPicker/store";
import {
    TRIGGER_SHOW_EMOJIPICKER,
    REFRESH_COMMENT_CONTENT,
    REFRESH_VISITOR_NAME,
    REFRESH_VISITOR_EMAIL, REFRESH_VISITOR_SITE_ADDRESS
} from './actionType'

const defaultState = fromJS({
    showEmojiPicker: false,
    commentContent: '',
    visitorNameManager: fromJS({
        value:'',
        showWarn: false,
        warnMsg: '格式有误'
    }),
    visitorEmailManager: fromJS({
        value:'',
        showWarn: false,
        warnMsg: '格式有误'
    }),
    visitorSiteAddressManager: fromJS({
        value:'',
        showWarn: false,
        warnMsg: '格式有误'
    })
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

    if(action.type === REFRESH_VISITOR_NAME){
        return state.merge({
            visitorNameManager: state.get('visitorNameManager').merge({
                value: action.value
            })
        })
    }

    if(action.type === REFRESH_VISITOR_EMAIL){
        return state.merge({
            visitorEmailManager: state.get('visitorEmailManager').merge({
                value: action.value
            })
        })
    }

    if(action.type === REFRESH_VISITOR_SITE_ADDRESS){
        return state.merge({
            visitorSiteAddressManager: state.get('visitorSiteAddressManager').merge({
                value: action.value
            })
        })
    }

    if(action.type === APPEND_EMOJI_TO_COMMENT_CONTENT){
        return state.merge({
            commentContent: state.get('commentContent') + action.value
        })
    }
    return state
}