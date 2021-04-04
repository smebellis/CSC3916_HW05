import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env'

function commentSet(reviews){
    return {
        type : actionTypes.SET_COMMENT,
        reviews : reviews
    }
}

function ratingSet(reviews){
    return {
        type : actionTypes.SET_RATING,
        reviews : reviews
    }
}

export function setReviews(data) {
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors',
            body : JSON.stringify(data)
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            localStorage.setItem('comment', data.comment);
            localStorage.setItem('rating', data.rating);
            
            dispatch(commentSet(res.reviews), ratingSet(res.reviews));

        }).catch((e) => console.log(e));
    }
}

