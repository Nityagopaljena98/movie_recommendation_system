import { React, useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
} from "react-router-dom";
import "../css/Carousel.css";
import { changePrefernce, getMovie } from "../utils/HomePage.fns";
import Target from "./Target";
import store from "../app/store.js";
import { setBigMovies } from "../features/moviesSlice";
import axios from "axios";

function Carousel({ genre, movies, scroll }) {
  const [rightExt, setRightExt] = useState(!scroll);
  const [leftExt, setLeftExt] = useState(true);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselTrack = useRef(null);
  const [redirect, setDirect] = useState(false);
  const [id, setId] = useState(null);
  const [clickedMovie, setClickedMovie] = useState(null);

  const rightObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting === true) {
        setRightExt(true);
      }
    },
    { threshold: [0.5] }
  );

  const leftObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting === true) {
        setLeftExt(true);
      }
    },
    { threshold: [0.5] }
  );
  const moveForward = (e) => {
    rightObserver.observe(carouselTrack.current.lastChild);
    setLeftExt(false);
    carouselTrack.current.scrollLeft +=
      2 * carouselTrack.current.children[0].getBoundingClientRect().width;
  };
  const moveBackward = (e) => {
    leftObserver.observe(carouselTrack.current.children[0]);
    setRightExt(false);
    carouselTrack.current.scrollLeft -=
      2 * carouselTrack.current.children[0].getBoundingClientRect().width;
  };

  const imgClick = async (e) => {
    e.preventDefault()
    changePrefernce(JSON.parse(e.target.attributes.state.value).title)
    setClickedMovie(JSON.parse(e.target.attributes.state.value))
    setDirect(true)
} 



  useEffect(() => {
      console.log(`clicked movie`,clickedMovie)
  },[clickedMovie])

  return redirect ? (
    <Redirect
      from="/home"
      push
      to={{
        pathname: `/title/${clickedMovie.titleId}`,
        state: clickedMovie,
        target: false,
      }}
    />
  ) : (
    <div className="carousel">
      <div className="carousel_cover">
        <div className="carousel_cover__title">{genre}</div>
        <div className="carousel_track_div">
          {!rightExt && !leftExt ? (
            <>
              <div className="right_overlay"></div>
              <div className="left_overlay"></div>
            </>
          ) : leftExt ? (
            <div className="right_overlay"></div>
          ) : (
            <div className="left_overlay"></div>
          )}
          <div
            style={{ visibility: leftExt ? "hidden" : "visible" }}
            role="button"
            onClick={moveBackward}
            className="prev"
          >{`ᐸ`}</div>
          <ul ref={carouselTrack} className="carousel_track">
            {movies.map((movie) => (
              <li>
                <img
                  state={JSON.stringify(movie)}
                  role="button"
                  onClick={(e) => imgClick(e)}
                  src={movie.poster}
                />
              </li>
            ))}
          </ul>
          <div
            style={{ visibility: rightExt ? "hidden" : "visible" }}
            onClick={moveForward}
            role="button"
            className="after"
          >{`ᐳ`}</div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;