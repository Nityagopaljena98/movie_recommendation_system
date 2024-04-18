import React from 'react';
import Carousel from './Carousel.jsx';

function Movies({ movies }) {
    return (
        <div style={{ position: "relative", width: "100%", height: "fit-content", display: "flex", flexDirection: 'column' }}>
            <Carousel 
                key={movies.titleId}
                movies={movies} 
            />
        </div>
    );
}

export default Movies;