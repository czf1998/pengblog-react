import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import { createAppendEmojiToCommentContentAction } from './store'
import { createTriggerShowEmojiPickerAction } from '../../store/actionCreators'

const HEIGHT_OF_EMOJI_MART_SCROLL = "175px"

const EMOJI_MART_SCROLL_CLASSNAME = "emoji-mart-scroll"

const EMOJI_MART_BAR_CLASSNAME = 'emoji-mart-bar'

class EmojiPick extends PureComponent {

    render() {

        const { metaColor, clickHandler } = this.props

        return <Picker perLine={9} color={metaColor} showPreview={false} showSkinTones={false} native={true} onClick={clickHandler}/>

    }

    componentDidMount() {
        document.getElementsByClassName(EMOJI_MART_SCROLL_CLASSNAME)[0].style.height=HEIGHT_OF_EMOJI_MART_SCROLL
        setTimeout(() => {
            window.addEventListener('click', this.props.shutdownThisEmojiPicker)
        }, 100)

    }

    componentWillUnmount() {
        window.removeEventListener('click', this.props.shutdownThisEmojiPicker)
    }
}




const mapState = (state) => ({
    metaColor: state.get('rootState').get('basicUIFeatures').get('metaColor')
})

const mapActions = (dispatch) => ({

    shutdownThisEmojiPicker(event){
        if(!event.path){
            const triggerShowEmojiPickerAction = createTriggerShowEmojiPickerAction()
            dispatch(triggerShowEmojiPickerAction)
            return
        }

        if(!event.path.some((pathItem) => {
            return pathItem.className === 'emoji-mart-emoji emoji-mart-emoji-native'
        }) && event.path.some((pathItem) => {
            return pathItem.className === 'emoji-mart'
        })){
            return
        }

        if(event.path.some((pathItem) => {
            return pathItem.className === 'emoji-mart-bar'
        })){
            return
        }

        const triggerShowEmojiPickerAction = createTriggerShowEmojiPickerAction()
        dispatch(triggerShowEmojiPickerAction)
    },

    clickHandler(emoji){
        const appendEmojiToCommentContentAction = createAppendEmojiToCommentContentAction(emoji.native)
        dispatch(appendEmojiToCommentContentAction)
    }
})

export default connect(mapState,mapActions)(EmojiPick)