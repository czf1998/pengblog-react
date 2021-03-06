import React, { Component } from 'react'
import {connect} from 'react-redux'
import {SelectWrapper,
        SelectHead,
        SelectContent,
        SelectButton,
        SelectButtonFixer,
        Options,
        OptionItem} from "./style";
import {createAppointSelectContentAction} from './store'

class Select extends Component{

    constructor(props){
        super(props)
        this.state = {
            show: false
        }
        this.openOptions = this.openOptions.bind(this)
        this.closeOptions = this.closeOptions.bind(this)
    }

    render() {


            const {selectId,value,optionList,appointSelectContent,width} = this.props

        return (
            <SelectWrapper>
                <SelectHead>

                    <SelectContent ref="selectContent"
                                   id="selectContent"
                                   width={width}
                                   disabled={true}>{value}</SelectContent>


                    <SelectButton>
                        <SelectButtonFixer>
                          <i className='fa fa-angle-down' ref="selectButtonIcon"/>
                        </SelectButtonFixer>
                    </SelectButton>
                </SelectHead>

                {
                    optionList &&
                    <Options show={this.state.show} length={optionList.length}>
                        {
                            optionList.map((item,index) => {
                                return <OptionItem key={index} onClick={() => appointSelectContent(selectId,item)}>{item}</OptionItem>
                            })
                        }
                    </Options>
                }

            </SelectWrapper>
        )
    }

    componentDidMount(){
      this.refs.selectButtonIcon.addEventListener('click', this.openOptions)
    }

    openOptions(){
        this.setState({
            show: true
        })
        this.refs.selectButtonIcon.removeEventListener('click', this.openOptions)

        setTimeout(() => {
            window.addEventListener('click', this.closeOptions)
        },100)
    }

    closeOptions(){
        this.setState({
            show: false
        })
        window.removeEventListener('click', this.closeOptions)
        this.refs.selectButtonIcon.addEventListener('click', this.openOptions)
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

