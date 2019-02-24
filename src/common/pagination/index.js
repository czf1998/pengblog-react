import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {PaginationWrapper,
        GoToFirstPageIcon,
        GoToLastIcon,
        GoToNextIcon,
        GoToEndPageIcon,
        Item,ThereAreMore} from "./style";
import {createAppointCurrentPageOfPaginationAction} from "./store";

class Pagination extends PureComponent{

    render(){

        const {currentPage, maxPage, paginationId} = this.props

        const itemList = [  currentPage - 3,
                            currentPage - 2,
                            currentPage - 1,
                            currentPage,
                            currentPage + 1,
                            currentPage + 2,
                            currentPage + 3 ]

        return (
            <PaginationWrapper>

                <GoToFirstPageIcon onClick={() => {this.props.jumpToThePage(paginationId,1)}}>
                    <i className="fa fa-angle-double-left"/>
                </GoToFirstPageIcon>

                <GoToLastIcon onClick={() => {this.props.jumpToThePage(paginationId,currentPage - 1)}}>
                    <i className="fa fa-angle-left"/>
                </GoToLastIcon>

                {
                    currentPage - 4 > 0 &&
                    <ThereAreMore>
                        ...
                    </ThereAreMore>
                }


                {
                    itemList.map((item) => {
                        if(item > 0 && item < (maxPage + 1)){
                            return  <Item key={item}
                                          isCurrentPage={currentPage === item}
                                          onClick={() => {this.props.jumpToThePage(paginationId,item)}}>
                                        {item}
                                     </Item>
                        }
                        return null
                    })
                }

                {
                    currentPage + 3 < maxPage &&
                    <ThereAreMore>
                        ...
                    </ThereAreMore>
                }


                <GoToNextIcon onClick={() => {this.props.jumpToThePage(paginationId,currentPage + 1)}}>
                    <i className="fa fa-angle-right"/>
                </GoToNextIcon>

                <GoToEndPageIcon onClick={() => {this.props.jumpToThePage(paginationId,maxPage)}}>
                    <i className="fa fa-angle-double-right"/>
                </GoToEndPageIcon>

            </PaginationWrapper>
        )
    }

    componentDidUpdate() {

    }
}

const mapState = (state) => ({

})

const mapActions = (dispatch) => ({
    jumpToThePage(paginationId,pageNumber){
        const value = {
            paginationId: paginationId,
            currentPage: pageNumber
        }
        const appointCurrentPageOfPaginationAction = createAppointCurrentPageOfPaginationAction(value)
        dispatch(appointCurrentPageOfPaginationAction)
    }
})

export default connect(mapState, mapActions)(Pagination)

