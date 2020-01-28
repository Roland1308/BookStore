import React from "react";

function RenderBooks(props) {
  const stile = {
    width: "205px",
    height: "320px"
  };
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={props.libro.cover} alt={props.libro.title} style={stile} />
        </div>
        <div className="flip-card-back">
          <h1>{props.libro.title}</h1>
          <p>{props.libro.description}</p>
          <a
            href={props.libro.detail}
            data-fancybox="gallery"
            data-options='{"infobar" : false, "buttons": ["close"]}'
          >
            <button className="button">Details</button>{" "}
          </a>
        </div>
      </div>
    </div>
  );
}

export default RenderBooks;
