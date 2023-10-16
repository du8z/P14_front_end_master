import { createSlice } from '@reduxjs/toolkit';

const storedData = localStorage.getItem("employees");
const initialState = {
  employees: storedData ? JSON.parse(storedData) : []
}
console.log(JSON.parse(storedData));
const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;


