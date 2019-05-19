import React from 'react'
import StarsRating from './StarsRating'

export const Colors = ({colors, changeColorRating, removeColor, copyColorHex}) => {
   return (
       <div className="colors-list">
       {colors.length > 0 ? 
        colors.map(color => {
            return (
                <div className="single-cart" key={color.id}>
                    <div className="cart-color" onClick={() => copyColorHex(color.color)} style={{backgroundColor: `${color.color}`}}></div>
                    <div className="cart-info">
                        <h3>{color.title}</h3>
                        <span onClick={() => copyColorHex(color.color)}>{color.color}</span>
                    </div>
                    <StarsRating 
                        totalStars={5} 
                        selectedStars={color.rating}
                        colorId={color.id} 
                        changeColorRating={changeColorRating}
                    />
                    <div className="cart-trash" onClick={() => removeColor(color.id)}>
                        <img src="fx/lixo.svg" alt="Lixo" />
                    </div>
                </div>
            )
        })
        :
        <div>Loading..</div>
        }
       </div>
   )
}