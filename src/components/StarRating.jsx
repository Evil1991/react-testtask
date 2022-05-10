import React, {useEffect, useState} from "react";

const Star = ({ starId, marked }) => {
  return (
    <span
      star-id={starId}
      role="button"
      style={{ color: "#ff9933", cursor: "pointer", fontSize: 40 }}
    >
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};

// Create an array of 5: Array.from({length: 5}, (v,i) => i)
const StarRating = props => {
  // Manages on Hover selection of a star
  const [selection, setSelection] = useState(0);

  // Manages rating selection
  const [rating, setRating] = useState(0);


  function changeRating(event) {
    setRating(event.target.getAttribute("star-id"))
  }

  useEffect(() => {
    props.changeRating(rating)
  }, [rating]);

  const hoverOver = event => {
    let starId = 0;
    if (event && event.target && event.target.getAttribute("star-id")) {
      starId = event.target.getAttribute("star-id");
    }
    setSelection(starId);
  };

  return (
    <div
      onMouseOver={hoverOver}
      onMouseOut={() => hoverOver(null)}
      onClick={changeRating}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star key={i} starId={i + 1} marked={selection ? selection > i : rating > i} />
      ))}
    </div>
  );
};

export default StarRating;
