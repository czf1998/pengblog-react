import React, { PureComponent } from 'react'
import { LoadingWrapper } from './style'
import { CommonClassNameConstants } from '../../commonStyle'
class Loading extends PureComponent{

    render() {
        return (
            <LoadingWrapper className={CommonClassNameConstants.FLEX_COLUMN_CENTER}>
                <i className={'fa fa-spinner fa-pulse fa-2x'} style={{color:'black'}}/>
                <div style={{marginTop: '10px'}}>IS LOADING ...</div>
            </LoadingWrapper>
        )
    }
}

export default Loading