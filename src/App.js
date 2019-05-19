import React, { Component } from 'react'
import {Colors} from './Components/Colors'
import {TopBar} from './Components/TopBar'
import {connect} from 'react-redux'
import {addColor, removeColor, rateColor, orderColors, searchColors} from './actions'

const mapStateToProps = state => {
  return {
    colors: state.mainReducer.colors,
    orderType: state.mainReducer.orderType,
    searchQuery: state.searchReducer.searchQuery,
    isLoading: state.mainReducer.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addColor: (color) => dispatch(addColor(color)),
    orderColors: (type) => dispatch(orderColors(type)),
    removeColor: (id) => dispatch(removeColor(id)),
    rateColor: (id, rating) => dispatch(rateColor(id, rating)),
    searchColors: (query) => dispatch(searchColors(query))
  }
}

class App extends Component {

  switchOrderType = (type) => {
    this.props.orderColors(type)
  }

  changeSearchQuery = (query) => {
    this.props.searchColors(query)
  }

  saveColorsLocalStorage = () => {
    localStorage.removeItem('colors')
    localStorage.setItem('colors', JSON.stringify(this.props.colors))
  }

  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        return this.saveColorsLocalStorage();
    });
  };

  copyColorHex = (color) => {
    var el = document.createElement('textarea');
    el.value = color;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.getElementById('copy-textarea').appendChild(el);
    el.select();
    document.execCommand('copy');
    alert('Color copied!')
    document.getElementById('copy-textarea').removeChild(el);
  }

  openColorInput = () => {
      document.getElementById('colorinput').focus()
      document.getElementById('colorinput').click()
  }

  componentDidMount(){
    this.setupBeforeUnloadListener()
  }

  render(){
    var orderedColors
    switch(this.props.orderType){
      case 'rating':
      orderedColors = this.props.colors.sort((a, b) => (a.rating < b.rating) ? 1 : -1)
      break

      case 'name':
      orderedColors = this.props.colors.sort((a, b) => (a.title > b.title) ? 1 : -1)
      break

      default:
      orderedColors = this.props.colors.sort((a, b) => (a.rating < b.rating) ? 1 : -1)
    }
    console.log(this.props.searchQuery)
    orderedColors = this.props.searchQuery !== '' ? orderedColors.filter(color => color.title.toLowerCase().includes(this.props.searchQuery.toLowerCase())) : orderedColors

    return (
      <div className="App">
        <div className="logo">
          <h1><strong>COLOR</strong>ORGNZR</h1>
        </div>
        <TopBar 
          orderType={this.props.orderType} 
          switchOrderType={this.switchOrderType}
          changeSearchQuery={this.changeSearchQuery}
          addColor={this.props.addColor}
          openColorInput={this.openColorInput}
        />
        {this.props.isLoading ?
          <h4>Loading...</h4>
          :
          <>
            <Colors 
              colors={orderedColors} 
              changeColorRating={this.props.rateColor}
              removeColor={this.props.removeColor}
              copyColorHex={this.copyColorHex}
            />
            <div id="copy-textarea"></div>
          </>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
