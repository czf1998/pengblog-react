import React from 'react'
import { PureComponent } from 'react'
import { connect } from 'react-redux'
import ContentLoader from "react-content-loader"

class ArticlePageLoader extends PureComponent{

    constructor(props){
        super(props)
    }

    render() {

        const { heightOfBrowser, widthOfMainArea, speed } = this.props

        const padding = 30

        return (
            <ContentLoader
                height={heightOfBrowser + 400}
                width={widthOfMainArea}
                speed={speed}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb">
                <rect x={padding} y="35" rx="4" ry="4" width={widthOfMainArea - 6 * padding} height="54" />
                <rect x={padding} y="120" rx="4" ry="4" width={widthOfMainArea - 14 * padding} height="16" />
                <rect x={padding} y="165" rx="5" ry="5" width={widthOfMainArea - 2 * padding} height="800" />
            </ContentLoader>
        )
    }
}

const mapState = (state) => {
    return {
        heightOfBrowser: state.get('rootState').get('heightOfBrowser'),
        widthOfMainArea: state.get('rootState').get('basicUIFeatures').get('widthOfMainArea'),
        speed: state.get('rootState').get('basicUIFeatures').get('placeholderSpeed')
    }
}

export default connect(mapState)(ArticlePageLoader)