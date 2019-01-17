import React, { PureComponent } from 'react'
import { LoadingWrapper } from './style'
import { CommonClassNameConstants } from '../../commonStyle'
import {loadingSpin} from './svg'
class Loading extends PureComponent{

    render() {
        return (
            <LoadingWrapper className={CommonClassNameConstants.FLEX_COLUMN_CENTER}>
                <img src={loadingSpin} alt="Loading icon"/>
                <div style={{marginTop: '10px'}}>IS LOADING</div>
            </LoadingWrapper>
        )
    }
}

export default Loading