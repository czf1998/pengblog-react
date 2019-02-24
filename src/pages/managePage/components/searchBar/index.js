import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {SearchBarWrapper,Input,SubmitButton} from './style'
import {createTriggerSearchInputIsFocusAction,
        createAppointKeyWordOfSearchBarAction} from './store'



class SearchBar extends PureComponent {

    constructor(props){
        super(props)
        this.checkKeyNumber = this.checkKeyNumber.bind(this)
    }

    render() {

        const {searchBarObj,
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

              <SubmitButton isFocus={isFocus}  onClick={() => {searchButtonClickHandler(searchBarValue)}}>
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
            const searchBarId = this.props.searchBarId
            const searchBarValue = this.props.searchBarObj.get(searchBarId).get('searchBarValue')
            this.props.searchButtonClickHandler(searchBarValue)
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
    }
})

export default connect(mapState, mapActions)(SearchBar)

