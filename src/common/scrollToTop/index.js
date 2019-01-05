import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends PureComponent{
    constructor(props){
        super(props)
    }

    render() {
        {
            console.log(this.props.children)
        }
        return (

            this.props.children
        )
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }
}

export default withRouter(ScrollToTop)