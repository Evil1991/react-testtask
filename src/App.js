import React from "react";
import './App.css';
import Form from "./components/Form";
import Loader from "./components/Loader";
import {useState} from "react";
import ThankYou from "./components/ThankYou";
import ErrorsList from "./components/ErrorsList";
import PostDataForm from "./components/API/api";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const changeLoading = (load) => {
    setLoading(load)
  }

  const postSubmit = (post) => {
    setLoading(true)

    let fetching = async () => {
      let response = await PostDataForm.postData(post)

      setLoading(false)
      setErrors(response.errors)
    }
    fetching()
  }

  return (
    <div className="App">
      <div className={[!loading && errors ? null : "form-hidden", "form-wrapper"].join(' ')}>
        <h1>Ваш отзыв</h1>
        (<Form changeLoading={changeLoading} postSubmit={postSubmit} className={"form-wrapper"}/>)
      </div>
      {loading
        ? (<Loader/>)
        : null
      }
      {errors == null
        ? (<ThankYou/>)
        : null
      }
      {!loading && errors !== null
        ? (<ErrorsList errors={errors}/>)
        : null
      }
    </div>
  );
}

export default App;
