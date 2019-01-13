import { fromJS } from 'immutable'
import { APPEND_EMOJI_TO_COMMENT_CONTENT} from "../components/emojiPicker/store";
import {
    TRIGGER_SHOW_EMOJIPICKER,
    REFRESH_COMMENT_CONTENT,
    APPOINT_INPUT_VALUE, APPOINT_INPUT_WARN
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

    if(action.type === APPOINT_INPUT_VALUE){
        switch (action.value.input) {
            case "visitorName":
                return state.merge({
                    visitorNameManager: state.get('visitorNameManager').merge({
                        value: action.value.inputValue
                    })
                })

            case "visitorEmail":
                return state.merge({
                    visitorEmailManager: state.get('visitorEmailManager').merge({
                        value: action.value.inputValue
                    })
                })

            case "visitorSiteAddress":
                return state.merge({
                    visitorSiteAddressManager: state.get('visitorSiteAddressManager').merge({
                        value: action.value.inputValue
                    })
                })
            default:
                return state
        }
    }

    if(action.type === APPEND_EMOJI_TO_COMMENT_CONTENT){
        return state.merge({
            commentContent: state.get('commentContent') + action.value
        })
    }

    if(action.type === APPOINT_INPUT_WARN){
        switch (action.value.input) {
            case "visitorName":
                return state.merge({
                    visitorNameManager: state.get('visitorNameManager').merge({
                        showWarn: action.value.showWarn,
                        warnMsg: action.value.warnMsg
                    })
                })
            case "visitorEmail":
                return state.merge({
                    visitorEmailManager: state.get('visitorEmailManager').merge({
                        showWarn: action.value.showWarn,
                        warnMsg: action.value.warnMsg
                    })
                })
            case "visitorSiteAddress":
                return state.merge({
                    visitorSiteAddressManager: state.get('visitorSiteAddressManager').merge({
                        showWarn: action.value.showWarn,
                        warnMsg: action.value.warnMsg
                    })
                })
            default:
                return state
        }
    }
    return state
}