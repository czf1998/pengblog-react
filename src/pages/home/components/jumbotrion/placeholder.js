import React from 'react'
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import ContentLoader from "react-content-loader"

class JumbotronLoader extends PureComponent{

    constructor(props){
        super(props)
    }

    render() {

        const { widthOfMainArea, speed } = this.props

        const paddingRight = 32

        const paddingTop = 64

        const width = widthOfMainArea - paddingRight * 2

        const height = 400 - paddingTop * 2

        return (
            <ContentLoader
                    height={280}
                    width={width}
                    speed={speed}
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb">
                <rect x="0" y="0" rx="4" ry="4" width="380" height="50" />
                <rect x="0" y="60" rx="4" ry="4" width="250" height="50" />
                <rect x="0" y="120" rx="5" ry="5" width="380" height="25" />
                <rect x="0" y="150" rx="5" ry="5" width="380" height="25" />
                <rect x="0" y="180" rx="5" ry="5" width="300" height="25" />

                <rect x="410" y="0" rx="5" ry="5" width="250" height="130" />
                <rect x="410" y="135" rx="5" ry="5" width="120" height="70" />
                <rect x="540" y="135" rx="5" ry="5" width="120" height="70" />
            </ContentLoader>
        )
    }
}

const mapState = (state) => {
    return {
        widthOfMainArea: state.get('rootState').get('basicUIFeatures').get('widthOfMainArea'),
        speed: state.get('rootState').get('basicUIFeatures').get('placeholderSpeed')
    }
}

export default connect(mapState)(JumbotronLoader)