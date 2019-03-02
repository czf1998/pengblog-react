import Loadable from 'react-loadable'
import React from 'react'
import {LoadingWrapper} from './style'
import Loading from '../../common/loading'

const LoginPageLoadable = Loadable({
    loader: () =>  import('./'),
    loading(){
        return (
            <LoadingWrapper>
                <Loading/>
            </LoadingWrapper>
        )
    }
});

export default () => <LoginPageLoadable/>