import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormFields, updateFormField } from '../redux/formSlice';
import FormField from './FormField';

const DynamicForm = () => {
  const dispatch = useDispatch();
  const { fields, isLoading, error, isValid } = useSelector((state) => state.form);

  useEffect(() => {
    dispatch(fetchFormFields()); 
  }, [dispatch]);

  const handleFieldChange = (fieldId, value) => {
    dispatch(updateFormField({ fieldId, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log("Form submitted successfully!");
    } else {
      console.log("Form is invalid");
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p> 
      ) : error ? (
        <p>Error: {error}</p> 
      ) : (
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <FormField
              key={field.id}
              field={field}
              onChange={handleFieldChange}
            />
          ))}
          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default DynamicForm;
