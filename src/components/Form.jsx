import React, {useState} from 'react';
import StarRating from "./StarRating";
import MyInput from "./UI/input/MyInput";


const Form = ({postSubmit}) => {
  const [post, setPost] = useState({name: '', email: '', comment: '', rating: 0});

  const handleSubmit = (event) => {
    event.preventDefault()
    postSubmit(post)
    console.log(post)
  };

  const changeName = (event) => {
    setPost({...post, name: event.target.value})
  }

  const changeComment = (event) => {
    setPost({...post, comment: event.target.value})
  }

  const changeEmail = (event) => {
    setPost({...post, email: event.target.value})
  }

  const changeRating = (number) => {
    setPost({...post, rating: number})
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Введите имя:
        <MyInput
          type="text"
          value={post.name}
          onChange={changeName}
        />
      </label>
      <label>Введите Email:
        <MyInput
          type="email"
          value={post.email}
          onChange={changeEmail}
        />
      </label>
      <StarRating changeRating={changeRating}/>
      <label>Напишите комментарий:
        <textarea
          value={post.comment}
          onChange={changeComment}/>
      </label>
      <button type="submit">Отправить</button>
    </form>
  )
}
export default Form;
