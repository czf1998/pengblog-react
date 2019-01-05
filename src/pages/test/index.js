import React, {PureComponent, Fragment} from 'react'

import Placeholder from '../articlePage/placeholder'

class Test extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{width:'750px'}}>
                <Placeholder/>
            </div>
        )
    }
}



export default Test
