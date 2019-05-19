import React from 'react'
import PropTypes from 'prop-types'

export const Star = ({selected=false, onClick=f=>f}) => {
   return (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="30.131" height="28.683" viewBox="0 0 30.131 28.683">
    <g id="Grupo_5" data-name="Grupo 5" transform="translate(0 0)">
      <g id="Grupo_4" data-name="Grupo 4" transform="translate(0 0)">
        <g id="Grupo_3" data-name="Grupo 3" transform="translate(0 0)">
          <path id="Caminho_6" data-name="Caminho 6" className={selected ? 'star selected' : 'star'} d="M18.844,53.318a.248.248,0,0,1-.235-.325l3.466-10.6-9.036-6.541a.248.248,0,0,1,.145-.448h0l11.154.021,3.427-10.616a.248.248,0,0,1,.471,0l3.427,10.616L42.82,35.4h0a.248.248,0,0,1,.145.448l-9.038,6.541,3.461,10.58a.248.248,0,0,1-.227.348h0a.247.247,0,0,1-.146-.048L28,46.7,18.99,53.271A.247.247,0,0,1,18.844,53.318Z" transform="translate(-12.937 -24.635)"/>
        </g>
      </g>
    </g>
  </svg>
   )
}

Star.propTypes = {
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}