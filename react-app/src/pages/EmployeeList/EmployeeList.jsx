import "./EmployeeList.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Composant principal pour la liste des employés
export default function EmployeeList() {
  // Sélectionne les employés depuis le store Redux
  const employees = useSelector((state) => state.employees.employees);

  // État local pour les paramètres de filtrage et de pagination
  const [filterParams, setFilterParams] = useState({
    sortColumn: null,
    sortOrder: "asc",
    employeesPerPage: 5,
    currentPage: 1,
    searchText: "",
  });
  // Fonction pour gérer le tri des colonnes
  const handleSort = (column) => {
    setFilterParams((prevParams) => ({
      ...prevParams,
      sortColumn: column,
      sortOrder:
        column === prevParams.sortColumn
          ? prevParams.sortOrder === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  };

  // Fonction pour parser une date au format "dd/MM/yyyy"
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  // Fonction pour comparer deux dates pour le tri
  const compareDates = (dateA, dateB) => {
    const parsedDateA = parseDate(dateA);
    const parsedDateB = parseDate(dateB);

    return filterParams.sortOrder === "asc"
      ? parsedDateA - parsedDateB
      : parsedDateB - parsedDateA;
  };

  const compareZipCodes = (zipCodeA, zipCodeB) => {
    return filterParams.sortOrder === "asc"
      ? zipCodeA - zipCodeB
      : zipCodeB - zipCodeA;
  };

  const getSortedEmployees = () => {
    let sortedEmployees = [...employees];

    if (
      filterParams.sortColumn === "dateOfBirth" ||
      filterParams.sortColumn === "startDate"
    ) {
      sortedEmployees.sort((a, b) =>
        compareDates(a[filterParams.sortColumn], b[filterParams.sortColumn])
      );
    } else if (filterParams.sortColumn === "zipCode") {
      sortedEmployees.sort((a, b) =>
        compareZipCodes(
          parseInt(a[filterParams.sortColumn]),
          parseInt(b[filterParams.sortColumn])
        )
      );
    } else if (filterParams.sortColumn) {
      sortedEmployees.sort((a, b) =>
        filterParams.sortOrder === "asc"
          ? a[filterParams.sortColumn].localeCompare(b[filterParams.sortColumn])
          : b[filterParams.sortColumn].localeCompare(a[filterParams.sortColumn])
      );
    }

    return sortedEmployees;
  };
  // Fonction pour gérer le changement du nombre d'employés par page
  const handleEmployeesPerPageChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setFilterParams((prevParams) => ({
      ...prevParams,
      employeesPerPage: selectedValue,
      currentPage: 1,
    }));
  };
  // Fonction pour gérer la recherche d'employés
  const handleSearch = (event) => {
    const text = event.target.value;
    setFilterParams((prevParams) => ({ ...prevParams, searchText: text }));
  };
  // Fonction pour gérer le changement de page
  const handlePageChange = (page) => {
    setFilterParams((prevParams) => ({ ...prevParams, currentPage: page }));
  };

  // Liste triée des employés en fonction des paramètres de filtrage
  const sortedEmployees = getSortedEmployees();

  // Indices de début et de fin pour l'affichage des employés actuels
  const startIndex =
    (filterParams.currentPage - 1) * filterParams.employeesPerPage;
  const endIndex = startIndex + filterParams.employeesPerPage;

  // Employés actuellement visibles sur la page
  const visibleEmployees = sortedEmployees.slice(startIndex, endIndex);

  // Employés filtrés en fonction du texte de recherche
  const filteredEmployees = visibleEmployees.filter((employee) =>
    Object.values(employee).some((value) =>
      value.toLowerCase().includes(filterParams.searchText.toLowerCase())
    )
  );

  // JSX de la liste des employés
  return (
    <div>
      <div className="headerTable">
        <h2>Employee List</h2>
        <Link to="/">Create Employee</Link>
        <div className="topOfTable">
          <label className="positionChildren">
            <p>Show</p>
            <select
              value={filterParams.employeesPerPage}
              onChange={handleEmployeesPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <p>employees per page</p>
          </label>
          <input
            type="text"
            placeholder="Search employees..."
            value={filterParams.searchText}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div>
        <table className="tableEmployee">
          <thead>
            <tr>
              <th className="pointer" onClick={() => handleSort("firstName")}>
                First Name{" "}
                {filterParams.sortColumn === "firstName"
                  ? filterParams.sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("lastName")}>
                Last Name{" "}
                {filterParams.sortColumn === "lastName"
                  ? filterParams.sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("dateOfBirth")}>
                Date of Birth{" "}
                {filterParams.sortColumn === "dateOfBirth"
                  ? filterParams.sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("startDate")}>
                Start Date{" "}
                {filterParams.sortColumn === "startDate"
                  ? filterParams.sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("street")}>
                Street{" "}
                {filterParams.sortColumn === "street"
                  ? filterParams.sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("city")}>
                City{" "}
                {filterParams.sortColumn === "city"
                  ? filterParams.sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("state")}>
                State{" "}
                {filterParams.sortColumn === "state"
                  ? filterParams.sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("zipCode")}>
                Zip Code{" "}
                {filterParams.sortColumn === "zipCode"
                  ? filterParams.sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("department")}>
                Department{" "}
                {filterParams.sortColumn === "department"
                  ? filterParams.sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={index} className="employeeRow">
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
      <div className="pagination">
        <button
          onClick={() => handlePageChange(filterParams.currentPage - 1)}
          disabled={filterParams.currentPage === 1}
        >
          Prev
        </button>
        <div className="pageSquare">{filterParams.currentPage}</div>
        <button
          onClick={() => handlePageChange(filterParams.currentPage + 1)}
          disabled={
            filterParams.currentPage ===
            Math.ceil(employees.length / filterParams.employeesPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
