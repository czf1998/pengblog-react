import { fromJS } from 'immutable'


const defaultState = fromJS({
    height: '70px',
    backgroundColor: 'white',
    metaColor: '#3367d6',

})

export default (state = defaultState, action) => {
    return state
}

