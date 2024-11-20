
export const validateField = (field, value) => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }
  
    
    if (field.type === 'email' && value) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }
  
    if (field.type === 'number' && value) {
      if (isNaN(value)) {
        return 'Please enter a valid number';
      }
    }
  
  
    return null;
  };
  