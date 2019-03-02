import Loadable from 'react-loadable'
import React from 'react'
import {Loading} from '../../common'
import {LoadingWrapper} from "../homeEx/style";

const heightOfBrowser = window.innerHeight

const ArticleEditPageLoadable = Loadable({
    loader: () =>  import('./'),
    loading(){
        return (
            <LoadingWrapper heightOfBrowser={heightOfBrowser}>
                <Loading/>
            </LoadingWrapper>
        )
    }
});

export default () => <ArticleEditPageLoadable/>