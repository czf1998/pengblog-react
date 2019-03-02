import Loadable from 'react-loadable'
import React from 'react'
import {LoadingWrapper} from './style'
import Loading from '../../common/loading'

const heightOfBrowser = window.innerHeight

const HomeEXLoadable = Loadable({
    loader: () =>  import('./'),
    loading(){
        return (
            <LoadingWrapper heightOfBrowser={heightOfBrowser}>
                <Loading/>
            </LoadingWrapper>
        )
    }
});

export default () => <HomeEXLoadable/>