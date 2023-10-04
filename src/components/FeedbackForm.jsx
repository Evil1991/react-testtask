import React, { useState } from "react";
import './FeedbackForm.module.css';

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [formStatus, setFormStatus] = useState("idle");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus("submitting");
    setErrors([]);

    try {
      const response = await fetch(
        "http://testtask.alto.codes/front-feedback.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            rating,
            comment,
          }),
        }
      );

      const data = await response.json();

      console.log(data)

      if (data.result === 1) {
        setFormStatus("success");
      } else {
        setErrors(data.errors);
        setFormStatus("error");
      }
    } catch (error) {
      console.error(error);
      setErrors(["Произошла ошибка при отправке формы"]);
      setFormStatus("error");
    }
  };

  if (formStatus === "success") {
    return <p>Спасибо за Ваш отзыв!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ваш отзыв</h2>

      {formStatus === "submitting" && <p>Обрабатываем...</p>}

      {errors.length > 0 && (
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <div>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
         
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="rating">Оценка:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(event) => setRating(parseInt(event.target.value))}
          min="1"
          max="5"
          required
        />
      </div>

      <div>
        <label htmlFor="comment">Комментарий:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          required
        />
      </div>

      <button type="submit">Отправить</button>
    </form>
  );
};

export default FeedbackForm;
