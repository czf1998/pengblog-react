import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import {SelectWrapper,
        SelectHead,
        SelectContent,
        SelectButton,
        SelectButtonFixer,
        Options,
        OptionItem,
        ShadowInput} from "./style";
import {createAppointSelectContentAction} from './store'

class Select extends Component{

    constructor(props){
        super(props)
        this.state = {
            show: false
        }
        this.clickHander = this.clickHander.bind(this)
    }

    render() {


        const {selectId,value,onChange,optionList,onFocus,onBlur,appointSelectContent,width} = this.props

        return (
            <SelectWrapper>
                <SelectHead>

                    <ShadowInput ref="shadowInput"
                                 onFocus={() => {focusHandler(this)}}
                                 onBlur={() => {blurHandler(this)}}/>


                    <SelectContent ref="selectContent"
                                   id="selectContent"
                                   width={width}
                                   disabled={true}
                                   value={value}
                                   onChange={onChange}/>


                    <SelectButton>
                        <SelectButtonFixer>
                          <i className='fa fa-angle-down' ref="selectButtonIcon"/>
                        </SelectButtonFixer>
                    </SelectButton>
                </SelectHead>

                <Options show={this.state.show} length={optionList.length}>
                    {
                        optionList.map((item,index) => {
                            return <OptionItem key={index} onClick={() => appointSelectContent(selectId,item)}>{item}</OptionItem>
                        })
                    }
                </Options>

            </SelectWrapper>
        )
    }

    componentDidMount(){
      this.refs.selectButtonIcon.addEventListener('click', this.clickHander)
    }

    clickHander(){
        this.refs.shadowInput.focus()
        this.refs.selectButtonIcon.removeEventListener('click', this.clickHander)
    }
}

const mapState = (state) => ({

})

const mapActions = (dispatch) => ({
    appointSelectContent(selectId, selectValue){
        const value = {
            selectValue: selectValue,
            selectId: selectId
        }
        const appointSelectContentAction = createAppointSelectContentAction(value)
        dispatch(appointSelectContentAction)
    }
})

export default connect(mapState,mapActions)(Select)


const focusHandler = (_this) => {
    _this.setState({
        show: true
    })
}

const blurHandler = (_this) => {
    setTimeout(() => {
        _this.setState({
            show: false
        })
        _this.refs.selectButtonIcon.addEventListener('click', _this.clickHander)
    },200)

}
