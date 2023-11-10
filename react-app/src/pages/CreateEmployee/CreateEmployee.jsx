import "./CreateEmployee.css";
import React, { useState } from "react";
import StateDropdown from "../../components/StateDropdown/StateDropdown";
import "react-datepicker/dist/react-datepicker.css";
import DatePickers from "../../components/DatePicker/DatePicker";
import { format } from "date-fns";
import Modal from 'my-modal-component-library'
import { addEmployee } from "../../Redux/employeeSlice";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";

export default function Home() {

  const dispatch = useDispatch()

  // État de la modal (ouverte/fermée) et fonctions pour la gérer.
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    startDate: new Date(),
    street: '',
    city: '',
    state: '',
    zipCode: 0,
    department: '',

  })

  // Actions lors de l'envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // formate les dates
    const formattedDateOfBirth = format(employee.dateOfBirth, "dd/MM/yyyy");
    const formattedStartDate = format(employee.startDate, "dd/MM/yyyy");

    // Crée un nouvel employé avec les bonnes données
    const newEmployee = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      dateOfBirth: formattedDateOfBirth,
      startDate: formattedStartDate,
      street: employee.street,
      city: employee.city,
      state: employee.state,
      zipCode: employee.zipCode,
      department: employee.department,
    };
    console.log(newEmployee);
    dispatch(addEmployee(newEmployee))


    // Reset les inputs
    setEmployee({
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(),
      startDate: new Date(),
      street: '',
      city: '',
      state: '',
      zipCode: '',
      department: '', 
    });


    openModal()
  };


  // JSX du formualaire, des différents input
  return (
    <div className="BodyHome">
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
      <Link to="/employee-list">View Current Employees</Link> 
        <h2>Create Employee</h2>
        <form onSubmit={handleSubmit} className="flexForm">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={employee.firstName}
            onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={employee.lastName}
            onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
            required
          />

          {/* Sélection des dates */}
          <div >
          <DatePickers
            label='Date of Birth'
            id= 'dateOfBirth'
            selected={employee.dateOfBirth}
            onChange={(date) => setEmployee({ ...employee, dateOfBirth: date })}
          />
          </div>
          <div >
          <DatePickers
            label='Start Date'
            id= 'startDate'
            selected={employee.startDate}
            onChange={(date) => setEmployee({ ...employee, startDate: date })}
          />
          </div>

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              value={employee.street}
              onChange={(e) => setEmployee({ ...employee, street: e.target.value })}
              required
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={employee.city}
              onChange={(e) => setEmployee({ ...employee, city: e.target.value })}
              required
            />

            <label htmlFor="state">State</label>
            <StateDropdown
              value={employee.state}
              onChange={(value) => setEmployee({ ...employee, state: value.target.value })}
            />

            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="number"
              id="zipCode"
              value={employee.zipCode}
              onChange={(e) => setEmployee({ ...employee, zipCode: e.target.value })}
              required
            />
          </fieldset>

          <label htmlFor="department">Department</label>
          <select
            name="department"
            id="department"
            value={employee.department}
            onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
            required
          >
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Legal">Legal</option>
          </select>

          <button type="submit" className="saveButton">
            Save
          </button>
        </form>
      </div>

      {/* MODAL */}
      <Modal
        show={showModal}
        onClose={closeModal}
        message="Employee Created !"
      />
    </div>
  );
}


