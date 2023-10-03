import "./CreateEmployee.css";
import React, { useState, useEffect } from "react";
import StateDropdown from "../../components/StateDropdown/StateDropdown";


export default function Home() {
  const [employee, setEmployeeData] = useState(() => {
    const savedData = localStorage.getItem("employees");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [departement, setDepartement] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      startDate: startDate,
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
      departement: departement,
    };
    
    const updatedEmployeeData = [...employee, newEmployee];
    setEmployeeData(updatedEmployeeData);

    localStorage.setItem("employees", JSON.stringify(updatedEmployeeData));

    setfirstName("");
    setLastName("");
    setDateOfBirth("");
    setStartDate("");
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");
    setDepartement("");
  };
  console.log(employee);

  useEffect(() => {
    const savedData = localStorage.getItem("employees");
    if (savedData) {
      setEmployeeData(JSON.parse(savedData));
    }
  }, [])



  return (
    <div className="BodyHome">
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <a href="employee-list">View Current Employees</a>
        <h2>Create Employee</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input
            type="text"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />

          <label htmlFor="start-date">Start Date</label>
          <input
            type="text"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <label htmlFor="state">State</label>
            <StateDropdown value={state} onChange={(e) => setState(e.target.value)} />

            <label htmlFor="zip-code">Zip Code</label>
            <input
              type="number"
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </fieldset>

          <label htmlFor="department">Department</label>
          <select
            name="department"
            id="department"
            value={departement}
            onChange={(e) => setDepartement(e.target.value)}
            required
          >
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Legal">Legal</option>
          </select>
          <button type="submit">Save</button>

        </form>

      </div>
      <div id="confirmation" className="modal">
        Employee Created!
      </div>
    </div>
  );
}
