import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
import {SearchBarWrapper,Input,SubmitButton,SearchTitle} from './style'
import {createTriggerSearchInputIsFocusAction,
        createAppointKeyWordOfSearchBarAction} from './store'



class SearchBar extends PureComponent {

    render() {

        const {searchBarObj,
                searchButtonClickHandler,
                triggerIsFocus,
                isFocus,
                appointKeyWordOfSearchBar,
                searchBarId} = this.props

        const searchBarValue = searchBarObj.get(searchBarId).get('searchBarValue')

        return (
          <SearchBarWrapper >
              <Input placeholder="标题、作者、标签"
                     value={searchBarValue}
                     onChange={(e) => {appointKeyWordOfSearchBar(e, searchBarId)}}
                     onFocus={() => {triggerIsFocus(searchBarId,true)}}
                     onBlur={() => {triggerIsFocus(searchBarId,false)}}/>
              <SubmitButton isFocus={isFocus} onClick={() => {searchButtonClickHandler(searchBarValue)}}>
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
        searchBarObj: state.get('searchBar'),
        metaColor: state.get('rootState').get('basicUIFeatures').get('metaColor'),
        isFocus: state.get('searchBar').get('isFocus')
    }
}

const mapActions = (dispatch) => ({
    triggerIsFocus(searchBarId,flag){
        const value = {
            searchBarId: searchBarId,
            isFocus: flag
        }
        const triggerIsFocusAction = createTriggerSearchInputIsFocusAction(value)
        dispatch(triggerIsFocusAction)
    },
    appointKeyWordOfSearchBar(event, searchBarId){
        const value = {
            searchBarId: searchBarId,
            searchBarValue: event.target.value
        }
        const appointKeyWordOfSearchBarAction = createAppointKeyWordOfSearchBarAction(value)
        dispatch(appointKeyWordOfSearchBarAction)
    }
})

export default connect(mapState, mapActions)(SearchBar)

