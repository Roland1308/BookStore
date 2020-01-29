import React from "react";
import { Link } from "react-router-dom";

function RenderBooks(props) {
  const stile = {
    width: "205px",
    height: "320px"
  };

  return (
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={props.libro.cover} alt={props.libro.title} style={stile} />
        </div>
        <div className="flip-card-back">
          <h1>{props.libro.title}</h1>
          <p>{props.libro.description}</p>
          <Link
            to={{
              pathname: props.indice.toString(),
              id: props.indice
            }}>
            <button className="button">Details</button>
          </Link>
        </div>
      </div>
  );
}

export default RenderBooks;
