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



class ArticleFiling extends PureComponent {

    render() {

        const {year,month,articleFilingObj} = this.props

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
                 <SubmitButton>Go!</SubmitButton>
             </ArticleFilinger>
         </ArticleFilingWrapper>
        );
    }

    componentDidMount(){
    }
}



const mapState = (state) => {
    return  {
        year: state.get('select').get('year'),
        month: state.get('select').get('month')
    }
}

const mapActions = (dispatch) => ({

})

export default connect(mapState, mapActions)(ArticleFiling)

