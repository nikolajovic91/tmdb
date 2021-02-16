import {combineReducers} from 'redux';
import moviesReducer from './moviesReducer'
import showsReducer from './showsReducer'
import personsReducer from './personsReducer'

const rootReducer = combineReducers({
    movies: moviesReducer,
    tv: showsReducer,
    persons: personsReducer
})

export default rootReducer