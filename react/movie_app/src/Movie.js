import React from "react";
import PropTypes from "prop-types";
import "./Movie.css"

function Movie({year, title, summary, posterSrc, genres}) {
    return (
        <div className="movie">
            <img src={posterSrc} alt={title} title={title}/>
            <div className="movie__data">
                <h1 className="movie__title">{title}</h1>
                <h2 className="movie__year">{year}</h2>
                <ul className="movie__genres">
                    {genres.map((genre, index) =>
                        <li key={index} className="genres__genre">
                            {genre}
                        </li>
                    )}
                </ul>
                <p className="movie__summary">{summary.slice(0, 180)}...</p>
            </div>
        </div>
    );
}

Movie.propTypes = {
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    posterSrc: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie;