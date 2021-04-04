import constants from '../constants/actionTypes'

let initialState = {
    loggedIn: localStorage.getItem('token') ? true : false,
    username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
    movie_id: localStorage.getItem('movie_id'),
    movie_title: localStorage.getItem('movie_title')
}

const reviewReducer = (state = initialState, action) => {

    var updated = Object.assign({}, state);

    switch(action.type) {
        case constants.SET_COMMENT:
              updated['comment'] = action.comment;
              return updated;
        case constants.SET_RATING:
              updated['rating'] = action.rating;
              return updated;
        
        default:
              return state;
  }
}

export default reviewReducer