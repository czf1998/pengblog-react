import Loadable from 'react-loadable'
import React from 'react'
import {Loading} from '../../common'
import styled from 'styled-components'

const LoadingWrapper = styled.div`
        position: fixed;
        width: 100%;
        height: 100%;
    `

const ManagePageLoadable = Loadable({
    loader: () =>  import('./'),
    loading(){
        return (
            <LoadingWrapper>
                <Loading/>
            </LoadingWrapper>
        )
    }
});

export default () => <ManagePageLoadable/>