import Loadable from 'react-loadable'
import React from 'react'
import { Loading } from '../../common'

const ArticleEditPageLoadable = Loadable({
    loader: () =>  import('./'),
    loading(){
        return <Loading/>
    }
});

export default () => <ArticleEditPageLoadable/>