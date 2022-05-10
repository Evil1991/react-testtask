import React, {useEffect, useState} from 'react';
import StarRating from "./StarRating";
import ErrorsList from "./ErrorsList";

const Form = ({getLoading, getErrors, ...props}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([])

  useEffect(() => {
    getLoading(loading)
  }, [props, loading])

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(false)

    fetch(`http://testtask.alto.codes/front-feedback.php`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        rating,
        comment
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then((data) => {
        setErrors(data.errors)
        setLoading(true)
        getErrors(data)
      })

  }

  const changeRating = (rating) => {
    setRating(rating)
  }

  const changeComment = (event) => {
    setComment(event.target.value)
  }

  return (
    <div {...props}>
      <h1>Ваш отзыв</h1>
      <form onSubmit={handleSubmit}>
        <label>Введите имя:
          <input
            className="form-field"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>Введите Email:
          <input
            className="form-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <StarRating changeRating={changeRating}/>
        <label>Напишите комментарий:
          <textarea
            className="form-field"
            value={comment}
            onChange={changeComment}/>
        </label>
        {errors !== null
          ? <ErrorsList errors={errors}/>
          : null
        }
        <input type="submit"/>
      </form>
    </div>
  )
};

export default Form;
