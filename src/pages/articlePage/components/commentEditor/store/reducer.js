import { fromJS } from 'immutable'
import { APPEND_EMOJI_TO_COMMENT_CONTENT} from "../components/emojiPicker/store";
import {TRIGGER_SHOW_EMOJIPICKER,
        APPOINT_INPUT_VALUE,
        APPOINT_INPUT_WARN,
        TRIGGER_HAS_ONCE_TRY_TO_SUBMIT,
        TRIGGER_COMMENT_EDITOR_LOADING} from './actionType'
import {
    COMMENT_CONTENT,
    VISITOR_NAME,
    VISITOR_EMAIL,
    VISITOR_SITE_ADDRESS, TOP_LEVEL_COMMENT_EDITOR, SUB_COMMENT_EDITOR
} from '../constant'
import {RESET_COMMENT_EDITOR} from "../../../store/actionType";
import {
    APPOINT_SHOW_SUB_COMMENT_EDITOR_MANAGER
} from "../../comment/store/actionTypes";

const defaultState = fromJS({
    topLevelCommentEditor: fromJS({
        showEmojiPicker: false,
        commentContentManager: fromJS({
            value:'',
            showWarn: false,
            warnMsg: '格式有误'
        }),
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
        }),
        hasOnceTryToSubmit: false,
        isLoading: false
    }),
    subCommentEditor: fromJS({
        showEmojiPicker: false,
        commentContentManager: fromJS({
            value:'',
            showWarn: false,
            warnMsg: '格式有误'
        }),
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
    const topLevelCommentEditor = state.get('topLevelCommentEditor')
    const subCommentEditor = state.get('subCommentEditor')

    if(action.type === TRIGGER_COMMENT_EDITOR_LOADING) {
        switch (action.value.editorId) {
            case TOP_LEVEL_COMMENT_EDITOR:
                return state.merge({
                    topLevelCommentEditor: topLevelCommentEditor.merge({
                        isLoading: action.value.loading
                    })
                })
            case SUB_COMMENT_EDITOR:
                return state.merge({
                    subCommentEditor: subCommentEditor.merge({
                        isLoading: action.value.loading
                    })
                })
            default:
                return state
        }
    }

    if(action.type === TRIGGER_HAS_ONCE_TRY_TO_SUBMIT){
        switch (action.value) {
            case TOP_LEVEL_COMMENT_EDITOR:
                return state.merge({
                    hasOnceTryToSubmit: true
                })
            case SUB_COMMENT_EDITOR:
                return state.merge({
                    hasOnceTryToSubmit: true
                })
            default:
                return state
        }
    }

    if(action.type === TRIGGER_SHOW_EMOJIPICKER){
        switch (action.value) {
            case TOP_LEVEL_COMMENT_EDITOR:
                return state.merge({
                    topLevelCommentEditor: topLevelCommentEditor.merge({
                        showEmojiPicker: !topLevelCommentEditor.get('showEmojiPicker')
                    })
                })
            case SUB_COMMENT_EDITOR:
                return state.merge({
                    subCommentEditor: subCommentEditor.merge({
                        showEmojiPicker: !subCommentEditor.get('showEmojiPicker')
                    })
                })
            default:
                return state
        }
    }

    if(action.type === APPOINT_INPUT_VALUE){

        if(action.value.editorId === TOP_LEVEL_COMMENT_EDITOR){
            switch (action.value.input) {
                case COMMENT_CONTENT:
                    return state.merge({
                        topLevelCommentEditor: topLevelCommentEditor.merge({
                            commentContentManager: topLevelCommentEditor.get('commentContentManager').merge({
                                value: action.value.inputValue
                            })
                        })
                    })

                case VISITOR_NAME:
                    return state.merge({
                        topLevelCommentEditor: topLevelCommentEditor.merge({
                            visitorNameManager: topLevelCommentEditor.get('visitorNameManager').merge({
                                value: action.value.inputValue
                            })
                        })
                    })

                case VISITOR_EMAIL:
                    return state.merge({
                        topLevelCommentEditor: topLevelCommentEditor.merge({
                            visitorEmailManager: topLevelCommentEditor.get('visitorEmailManager').merge({
                                value: action.value.inputValue
                            })
                        })
                    })

                case VISITOR_SITE_ADDRESS:
                    return state.merge({
                        topLevelCommentEditor: topLevelCommentEditor.merge({
                            visitorSiteAddressManager: topLevelCommentEditor.get('visitorSiteAddressManager').merge({
                                value: action.value.inputValue
                            })
                        })
                    })
                default:
                    return state
            }
        }
        if(action.value.editorId === SUB_COMMENT_EDITOR){
            switch (action.value.input) {
                case COMMENT_CONTENT:
                    return state.merge({
                        subCommentEditor: subCommentEditor.merge({
                            commentContentManager: subCommentEditor.get('commentContentManager').merge({
                                value: action.value.inputValue
                            })
                        })
                    })

                case VISITOR_NAME:
                    return state.merge({
                        subCommentEditor: subCommentEditor.merge({
                            visitorNameManager: subCommentEditor.get('visitorNameManager').merge({
                                value: action.value.inputValue
                            })
                        })
                    })

                case VISITOR_EMAIL:
                    return state.merge({
                        subCommentEditor: subCommentEditor.merge({
                            visitorEmailManager: subCommentEditor.get('visitorEmailManager').merge({
                                value: action.value.inputValue
                            })
                        })
                    })

                case VISITOR_SITE_ADDRESS:
                    return state.merge({
                        subCommentEditor: subCommentEditor.merge({
                            visitorSiteAddressManager: subCommentEditor.get('visitorSiteAddressManager').merge({
                                value: action.value.inputValue
                            })
                        })
                    })
                default:
                    return state
            }
        }
    }

    if(action.type === APPEND_EMOJI_TO_COMMENT_CONTENT){
        switch (action.value.editorId) {
            case TOP_LEVEL_COMMENT_EDITOR:
                return state.merge({
                    topLevelCommentEditor:topLevelCommentEditor.merge({
                        commentContentManager: topLevelCommentEditor.get('commentContentManager').merge({
                            value: topLevelCommentEditor.get('commentContentManager').get('value') + action.value.emoji
                         })
                    })
                })
            case SUB_COMMENT_EDITOR:
                return state.merge({
                    subCommentEditor:subCommentEditor.merge({
                        commentContentManager: subCommentEditor.get('commentContentManager').merge({
                            value: subCommentEditor.get('commentContentManager').get('value') + action.value.emoji
                        })
                    })
                })
            default:
                return state
        }
    }

    if(action.type === APPOINT_INPUT_WARN){
        if(action.value.editorId === TOP_LEVEL_COMMENT_EDITOR) {
            switch (action.value.input) {
                case COMMENT_CONTENT:
                    return state.merge({
                        topLevelCommentEditor: topLevelCommentEditor.merge({
                            commentContentManager: topLevelCommentEditor.get('commentContentManager').merge({
                                showWarn: action.value.showWarn,
                                warnMsg: action.value.warnMsg ? action.value.warnMsg : topLevelCommentEditor.get('commentContentManager').get('warnMsg')
                            })
                        })
                    })
                case VISITOR_NAME:
                    return state.merge({
                        topLevelCommentEditor: topLevelCommentEditor.merge({
                            visitorNameManager: topLevelCommentEditor.get('visitorNameManager').merge({
                                showWarn: action.value.showWarn,
                                warnMsg: action.value.warnMsg ? action.value.warnMsg : topLevelCommentEditor.get('visitorNameManager').get('warnMsg')
                            })
                        })
                    })
                case VISITOR_EMAIL:
                    return state.merge({
                        topLevelCommentEditor: topLevelCommentEditor.merge({
                            visitorEmailManager: topLevelCommentEditor.get('visitorEmailManager').merge({
                                showWarn: action.value.showWarn,
                                warnMsg: action.value.warnMsg ? action.value.warnMsg : topLevelCommentEditor.get('visitorEmailManager').get('warnMsg')
                            })
                        })
                    })
                case VISITOR_SITE_ADDRESS:
                    return state.merge({
                        topLevelCommentEditor: topLevelCommentEditor.merge({
                            visitorSiteAddressManager: topLevelCommentEditor.get('visitorSiteAddressManager').merge({
                                showWarn: action.value.showWarn,
                                warnMsg: action.value.warnMsg ? action.value.warnMsg : topLevelCommentEditor.get('visitorSiteAddressManager').get('warnMsg')
                            })
                        })
                    })
                default:
                    return state
            }
        }
        if(action.value.editorId === SUB_COMMENT_EDITOR) {
            switch (action.value.input) {
                case COMMENT_CONTENT:
                    return state.merge({
                        subCommentEditor: subCommentEditor.merge({
                            commentContentManager: subCommentEditor.get('commentContentManager').merge({
                                showWarn: action.value.showWarn,
                                warnMsg: action.value.warnMsg ? action.value.warnMsg : subCommentEditor.get('commentContentManager').get('warnMsg')
                            })
                        })
                    })
                case VISITOR_NAME:
                    return state.merge({
                        subCommentEditor: subCommentEditor.merge({
                            visitorNameManager: subCommentEditor.get('visitorNameManager').merge({
                                showWarn: action.value.showWarn,
                                warnMsg: action.value.warnMsg ? action.value.warnMsg : subCommentEditor.get('visitorNameManager').get('warnMsg')
                            })
                        })
                    })
                case VISITOR_EMAIL:
                    return state.merge({
                        subCommentEditor: subCommentEditor.merge({
                            visitorEmailManager: subCommentEditor.get('visitorEmailManager').merge({
                                showWarn: action.value.showWarn,
                                warnMsg: action.value.warnMsg ? action.value.warnMsg : subCommentEditor.get('visitorEmailManager').get('warnMsg')
                            })
                        })
                    })
                case VISITOR_SITE_ADDRESS:
                    return state.merge({
                        subCommentEditor: subCommentEditor.merge({
                            visitorSiteAddressManager: subCommentEditor.get('visitorSiteAddressManager').merge({
                                showWarn: action.value.showWarn,
                                warnMsg: action.value.warnMsg ? action.value.warnMsg : subCommentEditor.get('visitorSiteAddressManager').get('warnMsg')
                            })
                        })
                    })
                default:
                    return state
            }
        }
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
                    commentContentManager: subCommentEditor.get('commentContentManager').merge({
                        value: '回复 ' + action.value.replyingVisitorName + ': '
                    })
                })
                :
                subCommentEditor.merge({
                    commentContentManager: subCommentEditor.get('commentContentManager').merge({
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