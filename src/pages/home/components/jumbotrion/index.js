import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { JumbotronWrapper, JumbotronBackground, Title, Summary, ImageWrapper, ImageFirst, ImageSecond, ImageThird } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { Button } from "../../../../common/button";

class Jumbotron extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <JumbotronWrapper className={CommonClassNameConstants.COMMON_BORDER_RADIUS}>

                <Title className={CommonClassNameConstants.CURSORP}>
                    我们大多数人，都生活在平静的绝望
                </Title>
                <Summary className={CommonClassNameConstants.CURSORP}>
                    上海市区人中很多都是外地移民，所以比较容易接受新事物，就是所谓的海派文化，所以说上海本身比较开放，也是因为它是一个移民城市
                </Summary>
                <Button color="black"
                        backgroundColor="#eeeeee"
                        margin="15px 0 0 0"
                        borderColor="#DDDDDD">查看全文</Button>
                <ImageWrapper>
                    <ImageFirst  className={CommonClassNameConstants.CURSORP +
                                            CommonClassNameConstants.HOVER_ENLARGE}
                                 imgUrl="https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/77/image201812010404747.jpg"/>
                    <ImageSecond  className={CommonClassNameConstants.CURSORP +
                                             CommonClassNameConstants.HOVER_ENLARGE}
                                  imgUrl="https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/131/image201812011104113.jpg"/>
                    <ImageThird  className={CommonClassNameConstants.CURSORP +
                                            CommonClassNameConstants.HOVER_ENLARGE}
                                 imgUrl="https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/131/image201812011104118.jpg"/>
                </ImageWrapper>
            </JumbotronWrapper>
        )

    }


}

export default connect()(Jumbotron)