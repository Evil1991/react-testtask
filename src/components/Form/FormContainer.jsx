import {useState} from "react";
import React from 'react';
import Loader from "../common/Loader/Loader";
import Form from "./Form";
import ThankYou from "../ThankYou/ThankYou";
import ErrorsList from "../ErrorList/ErrorsList";
import PostDataForm from "../api/api";

const patchObject = (object, field, value) => ({
  ...object,
  [field]: value
});


const FormContainer = () => {

  const [isRequestPending, setIsRequestPending] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showThanks, setShowThanks] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    rating: 0
  });

  const onChangeName = (value) => {
    setFormData(patchObject(formData, 'name', value))
  }

  const onChangeEmail = (value) => {
    setFormData(patchObject(formData, 'email', value))
  }

  const onChangeRating = (value) => {
    setFormData(patchObject(formData, 'rating', value))
  }

  const onChangeComment = (value) => {
    setFormData(patchObject(formData, 'comment', value))
  }

  const onSubmit = () => {
    setIsRequestPending(true);

    (async () => {
      let response = await PostDataForm.postData(formData)

      setIsRequestPending(false)
      if (response.errors?.length) {
        setErrors(response.errors)
      } else {
        setShowThanks(true);
      }
    })()
  }

  return (
    <>
      {isRequestPending ? (
        <Loader/>
      ) : (
        <>
          {!showThanks ? (
            <Form
              formData={formData}
              onChangeName={onChangeName}
              onChangeEmail={onChangeEmail}
              onChangeRating={onChangeRating}
              onChangeComment={onChangeComment}
              onSubmit={onSubmit}
              />
          ) : (
            <ThankYou />
          )}
          {errors && <ErrorsList errors={errors} />}
        </>
      )}
    </>
  );
};

export default FormContainer;