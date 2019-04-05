import Loadable from 'react-loadable'
import React from 'react'
import { Loading } from '../../common'
import {LoadingWrapper} from './style'


const ArticlePageLoadable = Loadable({
    loader: () =>  import('./'),
    loading(){
        return <LoadingWrapper>
                    <Loading/>
                </LoadingWrapper>
    }
});

export default () => <ArticlePageLoadable/>