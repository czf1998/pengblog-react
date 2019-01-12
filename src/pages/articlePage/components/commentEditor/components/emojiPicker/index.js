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

        if(!event.path.some((pathItem) => {
            return pathItem.className === 'emoji-mart-emoji emoji-mart-emoji-native'
        })){
            return
        }

        if(event.path.some((pathItem) => {
            return pathItem.className === 'emoji-mart-bar'
        })){
            return
        }
       /* if(event.path[0].tagName === 'svg'
            ||
            event.path[0].tagName === 'path'
            ||
            event.path[0].className === 'emoji-mart-anchor '
            ||
            event.path[0].className === 'emoji-mart-anchors'
            ||
            event.path[0].className === 'emoji-mart-anchor-icon'
            ||
            event.path[0].innerText === 'Smileys & People'
            ||
            event.path[0].className === 'emoji-mart-scroll'){
            return
        }*/

        const triggerShowEmojiPickerAction = createTriggerShowEmojiPickerAction()
        dispatch(triggerShowEmojiPickerAction)
    },

    clickHandler(emoji){
        const appendEmojiToCommentContentAction = createAppendEmojiToCommentContentAction(emoji.native)
        dispatch(appendEmojiToCommentContentAction)
    }
})

export default connect(mapState,mapActions)(EmojiPick)