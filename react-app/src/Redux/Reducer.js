import { combineReducers } from "redux";
import employeeSlice from "./employeeSlice";

const rootReducer = combineReducers({
    employees: employeeSlice,
    // Ajoutez d'autres réducteurs ici si nécessaire.
  });
  
  export default rootReducer;