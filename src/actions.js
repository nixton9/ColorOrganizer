import Constants from './constants'

export const addColor = color => ({
    type: Constants.ADD_COLOR,
    payload: color
})

export const removeColor = id => ({
    type:Constants.REMOVE_COLOR,
    payload: id
})

export const rateColor = (id, rating) => ({
    type: Constants.RATE_COLOR,
    payload: {id: id, rating: rating}
})

export const orderColors = (type) => ({
    type: Constants.ORDER_COLORS,
    payload: type
})

export const searchColors = (query) => ({
    type: Constants.SEARCH_COLORS,
    payload: query
})