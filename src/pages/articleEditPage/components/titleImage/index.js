import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {TitleImageWrapper,ButtonIcon,TitleImageInput,TitleImageInputLabel,TitleImageFrame} from './style'
import {CommonClassNameConstants} from "../../../../commonStyle";
import {createAppointTitleImageUrlAction} from './store'

class TitleImage extends PureComponent{

    render(){

        const {imageUrl,sizeOfTitleImageFrame} = this.props

        const heigthOfTitleImage = 700 * sizeOfTitleImageFrame.get('height') / sizeOfTitleImageFrame.get('width')

        return (
            <TitleImageWrapper heightOfTitleImageFrame={heigthOfTitleImage}>

                <TitleImageInputLabel htmlFor="titleImageInput"  className={CommonClassNameConstants.FLEX_ROW_CENTER +
                                                                            CommonClassNameConstants.CURSORP}>

                    <TitleImageInput type="file" accept=".jpeg, .jpg, .png" id="titleImageInput" onChange={(event) => {changeHandler(event,this.props.appointTitleImageUrl)}}/>

                    <ButtonIcon>
                        <i className={CommonClassNameConstants.FONT_DARK + "fa fa-camera fa-2x"}/>
                    </ButtonIcon>
                </TitleImageInputLabel>

                <TitleImageFrame imageUrl={imageUrl}/>

            </TitleImageWrapper>
        )
    }
}

const mapState = (state) => ({
    imageUrl: state.get('titleImage').get('imageUrl'),
    sizeOfTitleImageFrame: state.get('titleImage').get('sizeOfTitleImageFrame')
})

const mapActions = (dispatch) => ({
    appointTitleImageUrl(_imageUrl){
        const appointTitleImageUrlValueAction = createAppointTitleImageUrlAction(_imageUrl)
        dispatch(appointTitleImageUrlValueAction)
    }
})

export default connect(mapState,mapActions)(TitleImage)

const changeHandler = (event,appointTitleImageUrl) => {
    let image = event.target.files[0]
    let fileReader = new FileReader()
    let imageObj = new Image()
    fileReader.onload = function(){
        imageObj.src = fileReader.result
    }
    fileReader.readAsDataURL(image);
    imageObj.onload = () => {
        appointTitleImageUrl({
            fileReaderResult:fileReader.result,
            sizeOfTitleImageFrame:{
                width:imageObj.width,
                height:imageObj.height
            }
        })
    }
}
