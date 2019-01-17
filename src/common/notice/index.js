import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import {NoticeWrapper,
        NoticePositioner,
        NoticeBody} from "./style";
import {createTriggerShowNoticeAction} from './store'
import {CommonClassNameConstants} from "../../commonStyle";

class Notice extends PureComponent{

    render(){

        const { showNotice,
                shutdownNotice,
                noticeContent } = this.props

        return (
            <NoticeWrapper>
                <NoticePositioner>
                    <CSSTransition in={showNotice}
                                   timeout={400}
                                   classNames={CommonClassNameConstants.SLIDE_DOWN}
                                   appear={true}
                                   unmountOnExit>
                        <NoticeBody>
                            {noticeContent}
                        </NoticeBody>
                    </CSSTransition>
                </NoticePositioner>
                {
                    showNotice && shutdownNotice()
                }
            </NoticeWrapper>
        )
    }
}

const mapState = (state) => ({
    showNotice: state.get('notice').get('showNotice'),
    noticeContent: state.get('notice').get('noticeContent')
})

const mapActions = (dispatch) => ({
    shutdownNotice(){
        setTimeout(() => {
            const triggerShowNoticeAction = createTriggerShowNoticeAction(false)
            dispatch(triggerShowNoticeAction)
        }, 2500)
    }
})

export default connect(mapState, mapActions)(Notice)