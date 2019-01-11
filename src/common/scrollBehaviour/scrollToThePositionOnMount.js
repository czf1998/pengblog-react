import { Component } from 'react'

class ScrollToThePositionOnMount extends Component {

    componentDidMount() {
        window.scrollTo(0, this.props.scrollPosition);
    }

    render() {
        return null;
    }
}

export default ScrollToThePositionOnMount