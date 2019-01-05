import React, { PureComponent } from 'react'
import { LoadingWrapper } from './style'
import { CommonClassNameConstants } from '../../commonStyle'
class Loading extends PureComponent{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <LoadingWrapper className={CommonClassNameConstants.FLEX_ROW_CENTER}>
                <i className={'fa fa-spinner fa-pulse fa-2x'} style={{color:'black'}}/>
            </LoadingWrapper>
        )
    }
}

export default Loading