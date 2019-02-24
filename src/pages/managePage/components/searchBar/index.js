import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {SearchBarWrapper,Input,SubmitButton} from './style'
import {createTriggerSearchInputIsFocusAction,
        createAppointKeyWordOfSearchBarAction} from './store'
import {createAppointManagePagePaginationAction} from "../../store";



class SearchBar extends PureComponent {

    constructor(props){
        super(props)
        this.checkKeyNumber = this.checkKeyNumber.bind(this)
    }

    render() {

        const {searchBarObj,
                dataGetter,
                searchButtonClickHandler,
                triggerIsFocus,
                appointKeyWordOfSearchBar,
                searchBarId} = this.props

        const searchBarValue = searchBarObj.get(searchBarId).get('searchBarValue')
        const isFocus = searchBarObj.get(searchBarId).get('isFocus')
        return (
          <SearchBarWrapper >
              <Input placeholder="标题、作者、标签"
                     value={searchBarValue}
                     onKeyDown={this.checkKeyNumber}
                     onChange={(e) => {appointKeyWordOfSearchBar(e, searchBarId)}}
                     onFocus={() => {triggerIsFocus(searchBarId,true)}}
                     onBlur={() => {triggerIsFocus(searchBarId,false)}}/>

              <SubmitButton isFocus={isFocus}  onClick={() => {searchButtonClickHandler(dataGetter)}}>
                {
                    isFocus ?
                        <i className='fa fa-search' style={{pointerEvents:'none'}}/>
                        :
                        'Search'
                }
              </SubmitButton>
              {/*<SearchTitle isFocus={isFocus}>搜索</SearchTitle>*/}
          </SearchBarWrapper>
        );
    }

    componentDidMount(){
    }

    checkKeyNumber(e){
        if(e.keyCode === 108 || e.keyCode === 13 ) {
            this.props.searchButtonClickHandler(this.props.dataGetter)
        }
    }
}



const mapState = (state) => {
    return  {
        searchBarObj: state.get('searchBar'),
        metaColor: state.get('rootState').get('basicUIFeatures').get('metaColor'),
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
    },
    searchButtonClickHandler(dataGetter){

        const value = {
            startIndex: 0,
            currentPage: 1
        }

        const appointManagePagePaginationAction = createAppointManagePagePaginationAction(value)
        dispatch(appointManagePagePaginationAction)

        dataGetter()

        const afterValue = {
            startIndex: 2,
            currentPage: 1
        }

        const afterAppointManagePagePaginationAction = createAppointManagePagePaginationAction(afterValue)
        dispatch(afterAppointManagePagePaginationAction)

    }
})

export default connect(mapState, mapActions)(SearchBar)

