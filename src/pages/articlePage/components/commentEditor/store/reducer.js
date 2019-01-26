import { fromJS } from 'immutable'
import { APPEND_EMOJI_TO_COMMENT_CONTENT} from "../components/emojiPicker/store";
import {TRIGGER_SHOW_EMOJIPICKER,
        APPOINT_INPUT_VALUE,
        APPOINT_INPUT_WARN,
        TRIGGER_HAS_ONCE_TRY_TO_SUBMIT,
        TRIGGER_COMMENT_EDITOR_LOADING} from './actionType'
import {
    COMMENT_CONTENT
} from '../constant'
import {RESET_COMMENT_EDITOR} from "../../../store/actionType";
import {
    APPOINT_SHOW_SUB_COMMENT_EDITOR_MANAGER
} from "../../comment/store/actionTypes";

const defaultState = fromJS({
    topLevelCommentEditor: fromJS({
        showEmojiPicker: false,
        commentContent: fromJS({
            value:'',
            showWarn: false,
            warnMsg: '格式有误'
        }),
        visitorName: fromJS({
            value:'',
            showWarn: false,
            warnMsg: '格式有误'
        }),
        visitorEmail: fromJS({
            value:'',
            showWarn: false,
            warnMsg: '格式有误'
        }),
        visitorSiteAddress: fromJS({
            value:'',
            showWarn: false,
            warnMsg: '格式有误'
        }),
        hasOnceTryToSubmit: false,
        isLoading: false
    }),
    subCommentEditor: fromJS({
        showEmojiPicker: false,
        commentContent: fromJS({
            value:'',
            showWarn: false,
            warnMsg: '格式有误'
        }),
        visitorName: fromJS({
            value:'',
            showWarn: false,
            warnMsg: '格式有误'
        }),
        visitorEmail: fromJS({
            value:'',
            showWarn: false,
            warnMsg: '格式有误'
        }),
        visitorSiteAddress: fromJS({
            value:'',
            showWarn: false,
            warnMsg: '格式有误'
        }),
        hasOnceTryToSubmit: false,
        isLoading: false,
    }),
    showSubCommentEditorIndex: undefined,
    showSubCommentEditorManager: fromJS({
        hostTopLevelCommentId: undefined,
        triggerFromCommentId: undefined
    })
})

export default (state = defaultState, action) => {
    const subCommentEditor = state.get('subCommentEditor')

    if(action.type === TRIGGER_COMMENT_EDITOR_LOADING) {
       return state.set(action.value.editorId, state.get(action.value.editorId).merge({
           isLoading: action.value.loading
       }))
    }

    if(action.type === TRIGGER_HAS_ONCE_TRY_TO_SUBMIT){
        return state.set(action.value, state.get(action.value).merge({
            hasOnceTryToSubmit: true
        }))
    }

    if(action.type === TRIGGER_SHOW_EMOJIPICKER){
        return state.set(action.value, state.get(action.value).merge({
            showEmojiPicker: !state.get(action.value).get('showEmojiPicker')
        }))
    }

    if(action.type === APPOINT_INPUT_VALUE){
        const theEidtor = state.get(action.value.editorId)
        const theInput = theEidtor.get(action.value.input)
        return state.set(action.value.editorId, theEidtor.set(action.value.input,theInput.merge({
            value: action.value.inputValue
        })))
    }

    if(action.type === APPEND_EMOJI_TO_COMMENT_CONTENT){
        const theEidtor = state.get(action.value.editorId)
        const theCommentContent = theEidtor.get(COMMENT_CONTENT)
        return state.set(action.value.editorId, theEidtor.set(COMMENT_CONTENT, theCommentContent.merge({
            value: theCommentContent.get('value') + action.value.emoji
        })))
    }

    if(action.type === APPOINT_INPUT_WARN){
        const theEidtor = state.get(action.value.editorId)
        const theInput = theEidtor.get(action.value.input)
        return state.set(action.value.editorId, theEidtor.set(action.value.input, theInput.merge({
            showWarn: action.value.showWarn,
            warnMsg: action.value.warnMsg ? action.value.warnMsg : theInput.get('warnMsg')
        })))
    }

    if(action.type === RESET_COMMENT_EDITOR){
        return defaultState
    }

    if(action.type === APPOINT_SHOW_SUB_COMMENT_EDITOR_MANAGER){
        const showSubCommentEditorManager = state.get('showSubCommentEditorManager')
        if(action.value.hostTopLevelCommentId === showSubCommentEditorManager.get('hostTopLevelCommentId')
            &&
            action.value.triggerFromCommentId === showSubCommentEditorManager.get('triggerFromCommentId')){
            return state.merge({
                showSubCommentEditorManager:defaultState.get('showSubCommentEditorManager')
            })
        }
        return state.merge({
            subCommentEditor: action.value.replyingVisitorName ? subCommentEditor.merge({
                    commentContent: subCommentEditor.get('commentContent').merge({
                        value: '回复 ' + action.value.replyingVisitorName + ': '
                    })
                })
                :
                subCommentEditor.merge({
                    commentContent: subCommentEditor.get('commentContent').merge({
                        value: ''
                    })
                }),
            showSubCommentEditorManager:showSubCommentEditorManager.merge({
                hostTopLevelCommentId: action.value.hostTopLevelCommentId,
                triggerFromCommentId: action.value.triggerFromCommentId
            })
        })
    }

    return state
}