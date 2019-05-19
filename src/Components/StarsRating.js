import React, {Component} from 'react'
import {Star} from './Star.js'
import PropTypes from 'prop-types'

class StarsRating extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedStars: 0
        }
        this.changeRating = this.changeRating.bind(this)
    }

    changeRating(selectedStars){
        this.setState({selectedStars})
        this.props.changeColorRating(this.props.colorId, selectedStars)
    }

    componentDidMount(){
        this.setState({selectedStars: this.props.selectedStars})
    }

    render(){
        const {totalStars} = this.props
        const {selectedStars} = this.state
        return (
            <div className="star-rating">
                {[...Array(totalStars)].map((number, i) => 
                    <Star key={i} 
                        selected={i<selectedStars} 
                        onClick={() => this.changeRating(i+1)} 
                    />
                )
                }
            </div>
        )
    }
}

export default StarsRating

StarsRating.propTypes = {
    totalStars: PropTypes.number,
    selectedStars: PropTypes.number,
    colorId: PropTypes.number,
    changeColorRating: PropTypes.func
}