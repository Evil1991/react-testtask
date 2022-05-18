import React, {useRef, useState} from "react";
import styles from './StarRating.module.css'

const Star = ({
  star,
  marked,
  onStarClick,
  onStarSelection,
  isSelectedStar
}) => {
  let refInput = useRef()

  let changeInputRating = () => {
    const dataValue = refInput.current.getAttribute("data-value");
    onStarClick(dataValue);
  }

  return (
    <label
      htmlFor={`star_${star}`}
      className={styles['star_label']}
      onMouseEnter={() => onStarSelection(star)}
      onMouseLeave={() => onStarSelection(0)}
    >
      <input
        ref={refInput}
        onChange={changeInputRating}
        className={styles['star_input']}
        type="radio"
        name="star"
        data-value={star}
        checked={isSelectedStar}
        id={`star_${star}`}
      />
      <div
        star-id={star}
        role="button"
        style={{
          color: "#ff9933",
          cursor: "pointer",
          fontSize: 40,
        }}
      >
        {marked ? "\u2605" : "\u2606"}
      </div>

    </label>
  );
};

const stars = [1, 2, 3, 4, 5]

const StarRating = ({
    value,
    changeRating
}) => {
  const [starHovered, setStarHovered] = useState(0);
  const [currentRating, setCurrentRating] = useState(value ? value : 0);

  let onRatingChange = (star) => {
    if (changeRating) {
      setCurrentRating(star);
      changeRating(star);
    }
  }

  const onStarSelection = (star) => {
    if (changeRating) {
      setStarHovered(star);
    }
  }

  return (
    <div
      className="rating-wrapper"
      onClick={changeRating}
    >
      {
        stars.map(star => (
          <Star
            key={star}
            star={star}
            onStarClick={onRatingChange}
            onStarSelection={onStarSelection}
            marked={starHovered ? starHovered >= star : currentRating >= star}
            isSelectedStar={currentRating === star}
          />
        ))
      }
    </div>
  );
};

export default StarRating;
