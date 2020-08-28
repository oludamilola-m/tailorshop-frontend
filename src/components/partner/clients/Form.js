import React, { useState } from "react";
import { Formik, Form as FormikForm, ErrorMessage, Field } from "formik";
import { string, object, number } from "yup";
import Input from "../../input/Input";
import Select from "react-select";
import { capitalize } from "../../../utilities/utilities";

const genderOptions = [
  { value: "", label: "Select....", color: "#0052CC", isDisabled: true },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const Form = ({ handleSubmit, fields }) => {
  let clientSchema = object().shape({
    firstName: string().required("Please enter client's first name"),
    lastName: string().required("Please enter client's last name"),
    gender: string().required("Please select a gender"),
    phoneNumber: number()
      .typeError("Phone number should contain only numbers")
      .required("Please enter client's phone number"),
  });

  const MySelect = (props) => {
    let selectedOption;
    if (props.value) {
      selectedOption = {
        value: props.value,
        label: capitalize(props.value),
      };
    } else {
      selectedOption = genderOptions[0];
    }
    const handleChange = ({ value }) => {
      props.onChange(props.field, value);
    };

    return (
      <React.Fragment>
        <label htmlFor={props.field}>{capitalize(props.field)} </label>
        <Select
          options={genderOptions}
          defaultValue={genderOptions[1]}
          onChange={handleChange}
          value={selectedOption}
          isSearchable={false}
        />
      </React.Fragment>
    );
  };

  const onSubmit = (values, { setSubmitting }) => {
    handleSubmit(values).then((r) => {
      console.log(values);
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 4000);
      // setSubmitting(false);
    });
  };

  return (
    <Formik
      initialValues={fields}
      onSubmit={onSubmit}
      validationSchema={clientSchema}
      validateOnChange={true}
      validateOnBlur={false}
    >
      {({
        isSubmitting,
        errors,
        handleChange,
        values,
        touched,
        setFieldValue,
      }) => (
        <FormikForm>
          <div className="fieldset m-bottom-5">
            <Input
              name="lastName"
              onChange={handleChange}
              label="Last Name"
              value={values.lastName}
              classNames={touched.lastName && errors.lastName ? "error" : ""}
            ></Input>
            <ErrorMessage
              name="lastName"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="fieldset m-bottom-5">
            <Input
              name="firstName"
              onChange={handleChange}
              label="First Name"
              value={values.firstName}
              classNames={touched.firstName && errors.firstName ? "error" : ""}
            ></Input>
            <ErrorMessage
              name="firstName"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="fieldset m-bottom-5">
            <Input
              name="phoneNumber"
              onChange={handleChange}
              label="Phone Number"
              value={values.phoneNumber}
              classNames={
                touched.phoneNumber && errors.phoneNumber ? "error" : ""
              }
            ></Input>
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="fieldset m-bottom-5">
            <MySelect
              value={values.gender}
              onChange={setFieldValue}
              error={errors.gender}
              touched={touched.gender}
              field={"gender"}
            />
            <ErrorMessage
              name="gender"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn--primary"
          >
            Save
          </button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;