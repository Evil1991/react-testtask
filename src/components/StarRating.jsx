import React, {useEffect, useRef, useState} from "react";

const Star = ({ starId, marked, changeInput }) => {
  let refInput = useRef()
  let refSpan = useRef()

  let changeInputRating = () => {
    let dataValue = refInput.current.getAttribute("data-value")
    changeInput(dataValue)
  }

  return (
    <div>
      <input ref={refInput} onChange={changeInputRating} onFocus={changeInputRating} className="form-modal__input-star" type="radio" name="star" id={starId} data-value={starId}/>
        <span
          ref={refSpan}
          star-id={starId}
          role="button"
          style={{ color: "#ff9933", cursor: "pointer", fontSize: 40 }}
        >
      {marked ? "\u2605" : "\u2606"}
    </span>
    </div>
  );
};

// Create an array of 5: Array.from({length: 5}, (v,i) => i)
const StarRating = props => {
  // Manages on Hover selection of a star
  const [selection, setSelection] = useState(0);

  // Manages rating selection
  const [rating, setRating] = useState(0);


  let changeRating = (event) => {
    setRating(event.target.getAttribute("star-id"))
  }

  let changeInput = (value) => {
    setRating(value)
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
      className={'rating-wrapper'}
      onMouseOver={hoverOver}
      onMouseOut={() => hoverOver(null)}
      onClick={changeRating}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star changeInput={changeInput} key={i} starId={i + 1} marked={selection ? selection > i : rating > i} />
      ))}
    </div>
  );
};

export default StarRating;
