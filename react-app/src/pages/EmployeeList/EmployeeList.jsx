import "./EmployeeList.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function EmployeeList() {

  const employees = useSelector(state => state.employees.employees)
  console.log(employees);

  return (
  <div >
    <h2>Employee List</h2>
    <Link to="/">Create Employee</Link> 
    <table className="tableEmployee">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Start Date</th>
          <th>Street</th>
          <th>City</th>
          <th>State</th>
          <th>Zip Code</th>
          <th>Department</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index}>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.dateOfBirth}</td>
            <td>{employee.startDate}</td>
            <td>{employee.street}</td>
            <td>{employee.city}</td>
            <td>{employee.state}</td>
            <td>{employee.zipCode}</td>
            <td>{employee.department}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

 