import React from 'react'
import PropTypes from 'prop-types'
import ModalToggler from './ModalToggler'

export const TopBar = ({orderType, switchOrderType, changeSearchQuery, addColor, openColorInput}) => {
    var handleSearchEvent = (e) => {
        changeSearchQuery(e.target.value)
    }
    var handleOrderEvent = (e) => {
        switchOrderType(e.target.value)
    }
    return (
        <div className="topbar">
            <div className="add-color">
                <ModalToggler type="add" addColor={addColor} openColorInput={openColorInput}/>
            </div>
            <div className="search-bar">
                <div className="searchbardiv"><input className="searchinput" type="text" onChange={handleSearchEvent} placeholder="Search"/></div>
                <img src="./fx/lupa.svg" alt="search"/>
            </div>
            <div className="order-type">
                <select defaultValue={orderType} onChange={handleOrderEvent} className="select-css">
                    <option value="rating">Order by Rating</option>
                    <option value="name">Order by Name</option>
                </select>
            </div>
        </div>
    )
}

TopBar.propTypes = {
    orderType: PropTypes.string,
    switchOrderType: PropTypes.func,
    changeSearchQuery: PropTypes.func,
    addColor: PropTypes.func,
    openColorInput: PropTypes.func
}

