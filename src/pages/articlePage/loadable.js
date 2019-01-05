import Loadable from 'react-loadable'
import React from 'react'
import { Loading } from '../../common'

const ArticlePageLoadable = Loadable({
    loader: () =>  import('./'),
    loading(){
        return <Loading/>
    }
});

export default () => <ArticlePageLoadable/>