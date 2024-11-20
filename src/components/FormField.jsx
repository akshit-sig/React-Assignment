import React from 'react';

const FormField = ({ field, onChange }) => {
  const handleChange = (e) => {
    const { type, checked, value } = e.target;
    onChange(field.id, type === 'checkbox' ? checked : value);
  };

  return (
    <div>
      <label htmlFor={field.id}>{field.label}</label>
      {field.type === 'text' && (
        <input
          type="text"
          id={field.id}
          value={field.value}
          onChange={handleChange}
          required={field.required}
        />
      )}
      {field.type === 'checkbox' && (
        <input
          type="checkbox"
          id={field.id}
          checked={field.value}
          onChange={handleChange}
          required={field.required}
        />
      )}
      {field.type === 'radio' &&
        field.options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name={field.id}
              value={option}
              checked={field.value === option}
              onChange={handleChange}
              required={field.required}
            />
            {option}
          </label>
        ))}
      {field.type === 'select' && (
        <select
          id={field.id}
          value={field.value}
          onChange={handleChange}
          required={field.required}
        >
          <option value="">Select {field.label}</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {field.error && <p style={{ color: 'red' }}>{field.error}</p>}
    </div>
  );
};

export default FormField;
