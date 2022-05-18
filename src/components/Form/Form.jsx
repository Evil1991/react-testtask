import React from 'react';
import StarRating from "../common/StarRating/StarRating";
import styles from './Form.module.css'


const Form = ({
  formData,
  onChangeName,
  onChangeEmail,
  onChangeRating,
  onChangeComment,
  onSubmit,
}) => {

  const nameChangeHandler = (e) => {
    onChangeName(e.target.value)
  }

  const emailChangeHandler = (e) => {
    onChangeEmail(e.target.value);
  }

  const ratingChangeHandler = (rating) => {
    onChangeRating(rating);
  }

  const commentChangeHandler = (e) => {
    onChangeComment(e.target.value);
  }

  return (
    <div className="form-wrapper">
      <form>
        <label>Введите имя:
          <input
            className={styles.input}
            type="text"
            value={formData.name}
            onChange={nameChangeHandler}
          />
        </label>
        <label>Введите Email:
          <input
            className={styles.input}
            type="email"
            value={formData.email}
            onChange={emailChangeHandler}
          />
        </label>
        <StarRating
          changeRating={ratingChangeHandler}
          value={formData.rating}
        />
        <label>Напишите комментарий:
          <textarea
            value={formData.comment}
            onChange={commentChangeHandler}/>
        </label>
        <button
          type="button"
          onClick={onSubmit}
        >
          Отправить
        </button>
      </form>
    </div>
  )
}
export default Form;
