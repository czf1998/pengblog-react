import React, { Component } from 'react'
import { connect } from 'react-redux'
import { JumbotronWrapper, Title, Summary } from './style'
import * as commonClassName from '../../../../commonStyle/commonClassNameConstant'

class Jumbotron extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <JumbotronWrapper className={commonClassName.COMMON_BORDER_RADIUS}>
                <Title>我们大多数人，都生活在平静的绝望中</Title>
                <Summary>上海市区人中很多都是外地移民，所以比较容易接受新事物，就是所谓的海派文化，所以说上海本身比较开放，也是因为它是一个移民城市。</Summary>
            </JumbotronWrapper>
        )

    }


}

export default connect()(Jumbotron)