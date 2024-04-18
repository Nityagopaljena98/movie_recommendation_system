import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';

function Slide({bg, logo, title , release, rating, genre , desc , percent }) {
    return (
        <div className = "slide">
            <img className =  "slide__bg" src = {bg} /> 
            <img className = "slide__logo" src =  {logo} /> 
            <span className = "slide__title">{title}</span>
            <div className="slide__btns">
              <div className = "slide__btns slide__btn play">
                    <PlayArrowIcon /> 
                    <span>Play</span>
                </div>
                <div className="slide__btns slide__btn mylist">
                    <AddIcon />
                    <span>My List</span> 
                </div>
            </div>
            <div className="slide__desc">
                <span className = "slide__desc__release">{release}</span>
                <span className = "spacer">|</span>
                <span className = "slide__desc__rating">{rating}</span>
                <span className = "spacer">|</span>
                <span className = "slide__desc__genre">{genre}</span>
                <span className = "spacer">|</span>
                <span className = "slide__desc__percent">{percent ? `${percent}%` : ``} </span>
                <span className="percent" style = {{fontFamily : "sans-serif" , margin : "0 0 0 8px" , fontWeight : "400" , color : "greenyellow"}}>{percent ? 'match' : ''}</span>
            </div>
            <div className = "slide__plot">{desc}</div>
        </div>
    )
}

export default Slide
