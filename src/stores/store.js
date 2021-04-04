import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from "../reducers/authReducer";
import movieReducer from "../reducers/movieReducer";
import reviewReducer from '../reducers/reviewReducer';
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
}

const store = createStore(
    combineReducers( {
        auth: authReducer,
        movie: movieReducer,
        review : reviewReducer
    }),
    applyMiddleware(
        ...middlewares
    )
);

export default store;