import Loadable from 'react-loadable'
import React from 'react'
import Loading from '../../common/loading'

const HomeLoadable = Loadable({
    loader: () =>  import('./'),
    loading(){
        return <Loading/>
    }
});

export default () => <HomeLoadable/>