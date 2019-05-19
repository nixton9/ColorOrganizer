import Constants from './constants'
import {defaultColors} from './data'

var storageColors = localStorage.getItem('colors') === 'undefined' || null ? null : localStorage.getItem('colors')

var initialState = {
    colors: storageColors === null ? defaultColors : JSON.parse(storageColors),
    orderType: 'name',
    isLoading: false
}

export const mainReducer = (state = initialState, action = {}) => {
    switch(action.type){
        case Constants.ORDER_COLORS:
            return {
                ...state,
                orderType: action.payload
            }

        case Constants.ADD_COLOR:
            return {
                ...state,
                colors: [...state.colors, action.payload]
            }

        case Constants.REMOVE_COLOR:
            return{
                ...state,
                colors: state.colors.filter(color => color.id != action.payload)
            }

        case Constants.RATE_COLOR:
            const newColors = state.colors.map(color => {
                if (color.id !== action.payload.id) return color
                console.log(Object.assign({}, color, {rating: action.payload.rating}))
                return {
                    ...color,
                    rating: action.payload.rating
                }
            });
            return {
                ...state,
                colors: newColors
            }
            
        default:
        return state
    }
}

var searchState = {
    searchQuery: ''
}

export const searchReducer = (state = searchState, action = {}) => {
    switch(action.type){
        case Constants.SEARCH_COLORS:
             return{
                 ...state,
                 searchQuery: action.payload
             }   

        default:
        return state
    }
}
