import Loadable from 'react-loadable'
import React from 'react'
import Loading from '../../common/loading'
import {LoadingWrapper} from './style'
const HomeLoadable = Loadable({
    loader: () =>  import('./'),
    loading(){
        return <LoadingWrapper>
                    <Loading/>
                </LoadingWrapper>
    }
});

export default () => <HomeLoadable/>