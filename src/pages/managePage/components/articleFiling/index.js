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

        const {year,month} = this.props

        return (
         <ArticleFilingWrapper>
             <ArticleFilingTitle>文章归档</ArticleFilingTitle>

             <ArticleFilinger>
                 <DateSelector>
                     <Select value={year}
                             selectId="year"
                             optionList={['2001','2002','2003']}
                             width="4.2rem"/>&nbsp;年&nbsp;
                     <Select value={month}
                             selectId="month"
                             optionList={['1','2','3']}
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

