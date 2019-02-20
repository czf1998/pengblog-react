import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
import {SearchBarWrapper,Input,SubmitButton,SearchTitle} from './style'
import {createTriggerSearchInputIsFocusAction} from './store'



class SearchBar extends PureComponent {

    render() {

        const {metaColor,triggerIsFocus,isFocus} = this.props

        return (
          <SearchBarWrapper >
              <Input placeholder="标题、作者、标签" onFocus={() => {triggerIsFocus(true)}} onBlur={() => {triggerIsFocus(false)}}/>
              <SubmitButton isFocus={isFocus}>
                {
                    isFocus ? <i className='fa fa-search'/> : ' Search'
                }
              </SubmitButton>
              {/*<SearchTitle isFocus={isFocus}>搜索</SearchTitle>*/}
          </SearchBarWrapper>
        );
    }

    componentDidMount(){
    }
}



const mapState = (state) => {
    return  {
        metaColor: state.get('rootState').get('basicUIFeatures').get('metaColor'),
        isFocus: state.get('searchBar').get('isFocus')
    }
}

const mapActions = (dispatch) => ({
    triggerIsFocus(flag){
        const triggerIsFocusAction = createTriggerSearchInputIsFocusAction(flag)
        dispatch(triggerIsFocusAction)
    }
})

export default connect(mapState, mapActions)(SearchBar)

