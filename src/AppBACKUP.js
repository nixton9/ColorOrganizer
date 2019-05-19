import React, { Component } from 'react'
import ModalToggler from './Components/ModalToggler'
import {Colors} from './Components/Colors'
import {TopBar} from './Components/TopBar'
import {defaultColors} from './data'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      colors: [],
      orderType: 'rating',
      searchQuery: '',
      isLoading: true
    }
  }

  addColor = (newColor) => {
    this.setState(prevState => ({
      colors: [...prevState.colors,newColor]
    }))
  }

  changeColorRating = (id, newRating) => {
    var colorsArr = this.state.colors
    for(var i=0, count=colorsArr.length; i<count; i++){
      if(Number(colorsArr[i].id) === Number(id)){
        colorsArr[i].rating = newRating
      }
    }
    this.setState({colors: colorsArr}, () => this.orderColors())
  }

  removeColor = (id) => {
    var colors = this.state.colors.filter(color => {
      return color.id != id
    })
    this.setState({colors: colors})
  }

  orderColors = () => {
    var orderedColors
    switch(this.state.orderType){
      case 'rating':
      orderedColors = this.state.colors.sort((a, b) => (a.rating < b.rating) ? 1 : -1)
      break

      case 'name':
      orderedColors = this.state.colors.sort((a, b) => (a.title > b.title) ? 1 : -1)
      break

      default:
      orderedColors = this.state.colors.sort((a, b) => (a.rating < b.rating) ? 1 : -1)
    }
    this.setState({colors: orderedColors})
  }

  switchOrderType = (type) => {
    this.setState({orderType: type}, () => this.orderColors())
  }

  changeSearchQuery = (query) => {
    this.setState({searchQuery: query}, () => console.log(this.state.searchQuery))
  }

  saveColorsLocalStorage = () => {
    localStorage.removeItem('colors')
    localStorage.setItem('colors', JSON.stringify(this.state.colors))
  }

  getColorsLocalStorage = () => {
    var colors = JSON.parse(localStorage.getItem('colors'))
    this.setState({colors: colors, isLoading: false})
  }

  getDefaultColors = () => {
    this.setState({colors: defaultColors, isLoading: false}, () => this.orderColors())
  }

  setupBeforeUnloadListener = () => {
    window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        return this.saveColorsLocalStorage();
    });
  };

  componentDidMount(){
    localStorage.getItem('colors') === null ? this.getDefaultColors() : this.getColorsLocalStorage()
    this.setupBeforeUnloadListener()
  }

  render(){
    var colors = this.state.searchQuery === '' ? 
      this.state.colors 
      : 
      this.state.colors.filter(color => {
       return color.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      })
      
    return (
      <div className="App">
        <TopBar 
          orderType={this.state.orderType} 
          switchOrderType={this.switchOrderType}
          changeSearchQuery={this.changeSearchQuery}
        />
        {this.state.isLoading ?
          <h4>Loading...</h4>
          :
          <>
            <Colors 
              colors={colors} 
              changeColorRating={this.changeColorRating}
              removeColor={this.removeColor}
            />
            <ModalToggler type="add" addColor={this.addColor}/>
          </>
        }
      </div>
    );
  }
}

export default App;
