import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
import {ArticleFilingWrapper,
        ArticleFilingTitle,
        ArticleFilinger,
        DateSelector,
        SubmitButton,
        Option} from './style'
import {} from './store'
import {Select} from '../../../../common'
import {createAppointManagePagePaginationAction} from "../../store";
import {createAppointSelectContentAction} from "../../../../common/select/store";



class ArticleFiling extends PureComponent {

    render() {

        const {year,month,articleFilingObj,dataGetter,submitButtonClickHandler} = this.props

        let years = []

        let months = []

        if(articleFilingObj){

            let toJSArticleFilingObj = articleFilingObj.toJS()

            Object.keys(toJSArticleFilingObj).forEach((key) => {
                years.push(key)
            })

            if(year){
                months = toJSArticleFilingObj[year]
            }

        }

        return (
         <ArticleFilingWrapper>
             <ArticleFilingTitle>文章归档</ArticleFilingTitle>

             <ArticleFilinger>
                 <DateSelector>
                     <Select value={year}
                             selectId="year"
                             optionList={years}
                             width="4.2rem"/>&nbsp;年&nbsp;
                     <Select value={month}
                             selectId="month"
                             optionList={months}
                             width="3.2rem"/>&nbsp;月&nbsp;

                 </DateSelector>
                 <SubmitButton year={year}
                               onClick={() => {submitButtonClickHandler(dataGetter)}}>Go!</SubmitButton>
             </ArticleFilinger>
         </ArticleFilingWrapper>
        );
    }

    componentDidMount(){

    }

    componentDidUpdate(preProps){
        if(preProps.year !== this.props.year){
            this.props.resetMonthValue()
        }

    }
}



const mapState = (state) => {
    return  {
        year: state.get('select').get('year'),
        month: state.get('select').get('month')
    }
}

const mapActions = (dispatch) => ({
    submitButtonClickHandler(dataGetter){

        const value = {
            startIndex: 0,
            currentPage: 1
        }

        const appointManagePagePaginationAction = createAppointManagePagePaginationAction(value)
        dispatch(appointManagePagePaginationAction)

        dataGetter()


    },
    resetMonthValue(){
        const value = {
            selectValue: undefined,
            selectId: 'month'
        }
        const appointSelectContentAction = createAppointSelectContentAction(value)
        dispatch(appointSelectContentAction)
    }
})

export default connect(mapState, mapActions)(ArticleFiling)

