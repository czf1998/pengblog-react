import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {TitleImageWrapper,ButtonIcon,TitleImageInput,TitleImageInputLabel,TitleImageFrame} from './style'
import {CommonClassNameConstants} from "../../../../commonStyle";
import {createAppointTitleImageUrlBase64Action,
        createUploadTitleImageAction,
        createAppointSizeOfTitleImageFrameAction} from './store'
import {saveArticle} from "../../index";
import store from '../../../../store'

class TitleImage extends PureComponent{

    render(){

        const {imageUrl,imageUrlBase64,sizeOfTitleImageFrame,widthOfBrowser} = this.props


        return (
            <TitleImageWrapper sizeOfTitleImageFrame={sizeOfTitleImageFrame} widthOfBrowser={widthOfBrowser}>

                <TitleImageInputLabel htmlFor="titleImageInput"  className={CommonClassNameConstants.FLEX_ROW_CENTER +
                                                                            CommonClassNameConstants.CURSORP}>

                    <TitleImageInput type="file" accept=".jpeg, .jpg, .png" id="titleImageInput" onChange={(event) => {changeHandler(event,this.props.appointTitleImageUrl,this.props.uploadTitleImage)}}/>

                    <ButtonIcon>
                        <i className={CommonClassNameConstants.FONT_DARK + "fa fa-camera fa-2x"}/>
                    </ButtonIcon>
                </TitleImageInputLabel>

                <TitleImageFrame imageUrl={imageUrlBase64?imageUrlBase64:imageUrl}/>

            </TitleImageWrapper>
        )
    }


    componentDidUpdate(preProps){

        let imageObj = new Image()

        imageObj.src = this.props.imageUrlBase64 ? this.props.imageUrlBase64 : this.props.imageUrl

        imageObj.onload = () => {

            this.props.appointSizeOfTitleImageFrame(imageObj)

        }

        //判断是否需要触发saveArticle，当组件更新是由读取草稿以及其他非上传新图所致，将不触发saveArticle
        /*if(this.props.imageUrl === preProps.imageUrl
            ||
            this.props.imageUrl === store.getState().get('articleEditPage').get('draftCache').get('article_titleImageUrl')){
            return
        }*/
        saveArticle(store.dispatch,'draft')
    }
}

const mapState = (state) => ({
    imageUrl: state.get('titleImage').get('imageUrl'),
    imageUrlBase64: state.get('titleImage').get('imageUrlBase64'),
    sizeOfTitleImageFrame: state.get('titleImage').get('sizeOfTitleImageFrame'),
    widthOfBrowser: state.get('rootState').get('widthOfBrowser')
})

const mapActions = (dispatch) => ({
    appointTitleImageUrl(_imageUrl){
        const appointTitleImageUrlBase64ValueAction = createAppointTitleImageUrlBase64Action(_imageUrl)
        dispatch(appointTitleImageUrlBase64ValueAction)
    },
    uploadTitleImage(image){
        const uploadTitleImageAction = createUploadTitleImageAction(image)
        dispatch(uploadTitleImageAction)
    },
    appointSizeOfTitleImageFrame(imageObj){
        const value = {
            width:imageObj.width,
            height:imageObj.height
        }
        const appointSizeOfTitleImageFrameAction = createAppointSizeOfTitleImageFrameAction(value)
        dispatch(appointSizeOfTitleImageFrameAction)
    }
})

export default connect(mapState,mapActions)(TitleImage)

const changeHandler = (event,appointTitleImageUrl,uploadTitleImage) => {

    let image = event.target.files[0]

    uploadTitleImage(image)

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
