import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFormConfig } from './api';
import { validateField } from '../utils/validation'; 

export const fetchFormFields = createAsyncThunk(
  'form/fetchFields',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchFormConfig();
      return response; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState: {
    fields: [], 
    isLoading: false,
    error: null,
    isValid: false, 
  },
  reducers: {
    updateFormField: (state, action) => {
      const { fieldId, value } = action.payload;
      const field = state.fields.find((f) => f.id === fieldId);
      if (field) {
        field.value = value;
        field.error = validateField(field, value);  
      }

     
      state.isValid = state.fields.every(
        (f) => !f.error && (!f.required || f.value)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormFields.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFormFields.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fields = action.payload.map((field) => ({
          ...field,
          value: field.type === 'checkbox' ? false : '', 
          error: null, 
        }));
      })
      .addCase(fetchFormFields.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { updateFormField } = formSlice.actions;
export default formSlice.reducer;
