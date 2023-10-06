import "./CreateEmployee.css";
import React, { useState, useEffect } from "react";
import StateDropdown from "../../components/StateDropdown/StateDropdown";
import "react-datepicker/dist/react-datepicker.css";
import DatePickers from "../../components/DatePicker/DatePicker";
import { format } from "date-fns";
import Modal from "../../components/Modal/Modal";
export default function Home() {
  // État de la modal (ouverte/fermée) et fonctions pour la gérer.
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }
  // Base de Données des employés
  const [employee, setEmployeeData] = useState(() => {
    const savedData = localStorage.getItem("employees");
    return savedData ? JSON.parse(savedData) : [];
  });

  // Création des States des inputs
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [departement, setDepartement] = useState("");

  // Actions lors de l'envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // formate les dates
    const formattedDateOfBirth = format(dateOfBirth, "dd/MM/yyyy");
    const formattedStartDate = format(startDate, "dd/MM/yyyy");

    // Crée un nouvel employé avec les bonnes données
    const newEmployee = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: formattedDateOfBirth,
      startDate: formattedStartDate,
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
      departement: departement,
    };

    // Ajout du nouvel employé
    const updatedEmployeeData = [...employee, newEmployee];
    setEmployeeData(updatedEmployeeData);

    // Mettez à jour localStorage avec les nouvelles données des employés.
    localStorage.setItem("employees", JSON.stringify(updatedEmployeeData));

    // Reset les inputs
    setfirstName("");
    setLastName("");
    setDateOfBirth("");
    setStartDate("");
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");
    setDepartement("");

    openModal()
  };

  // sauvegarder les employés
  useEffect(() => {
    const savedData = localStorage.getItem("employees");
    if (savedData) {
      setEmployeeData(JSON.parse(savedData));
      console.log(employee);
    }
  }, []);
  // JSX du formualaire, des différents input
  return (
    <div className="BodyHome">
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <a href="employee-list">View Current Employees</a>
        <h2>Create Employee</h2>
        <form onSubmit={handleSubmit} className="flexForm">
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
          {/* Séléction des dates  */}
          <DatePickers
            label="Date of Birth"
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
          />
          <DatePickers
            label="Start Date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
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
            <StateDropdown
              value={state}
              onChange={(e) => setState(e.target.value)}
            />

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
          <button type="submit" className="saveButton">
            Save
          </button>
        </form>
      </div>
      {/* MODAL  */}
      <Modal
        show={showModal}
        onClose={closeModal}
        message="Employee Created !"
      />
    </div>
  );
}
