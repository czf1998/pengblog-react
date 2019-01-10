import React, { Component } from 'react'
import { Route } from  'react-router-dom'

const preNavGuard = (ParComponent) => {
    return class PreNavGuard extends ParComponent{
        render(){
            return super.render()
        }
    }
}

export default preNavGuard(Route)