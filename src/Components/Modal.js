import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Modal extends Component{
    constructor(props){
        super(props)
        this.nameInput = React.createRef();
        this.colorInput = React.createRef();
    }

    addColor = (e) => {
        e.preventDefault()
        var color = {
            id: Math.floor(Math.random() * (100000 - 6) + 6),
            title:this.nameInput.current.value,
            color:this.colorInput.current.value,
            rating:0
        }
        this.props.addColor(color)
        this.nameInput.current.value = ''
        this.colorInput.current.value = ''
        this.props.close()
    }

    render(){
        return (
            <div className={this.props.className}>
                <button className="close-modal" onClick={this.props.close}>&#215;</button>
                <div className="modal-content">
                    <h4>Add a color to your list</h4>
                    <form onSubmit={this.addColor}>
                        <input 
                            type="text" 
                            placeholder="Color name" 
                            className="name-input" 
                            ref={this.nameInput}
                        />
                        <div className="colorinput-container" onClick={this.props.openColorInput}>
                            <input 
                                type="color" 
                                className="color-input"
                                ref={this.colorInput}
                                id="colorinput"
                            />
                        </div>
                        <button className="btn btn-form">Add</button>
                    </form>
                </div>
            </div>
        )
    }
    
}

export default Modal

Modal.propTypes = {
    className: PropTypes.string.isRequired,
    openColorInput: PropTypes.func.isRequired
}