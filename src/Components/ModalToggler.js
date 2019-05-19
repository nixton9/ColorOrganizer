import React, {Component} from 'react'
import Modal from './Modal.js'
import PropTypes from 'prop-types'

class ModalToggler extends Component{
    constructor(props){
        super(props)
        this.state = {
            active: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({active: !prevState.active}))
    }

    close = () => { 
        this.setState({active: false})
    }

    render(){
        var activeClass = this.state.active ? 'active' : 'notactive'
        var modalClass = `modal modal-`+this.props.type+` `+activeClass
        return (
            <>
                <span onClick={this.toggle}>Add a Color</span>
                <Modal className={modalClass} addColor={this.props.addColor} openColorInput={this.props.openColorInput} close={this.close}/>
            </>
            )
    }
}

export default ModalToggler

ModalToggler.propTypes = {
    type: PropTypes.string,
    addColor: PropTypes.func.isRequired,
    openColorInput: PropTypes.func.isRequired,
}