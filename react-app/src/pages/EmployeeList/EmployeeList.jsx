import "./EmployeeList.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function EmployeeList() {
  const employees = useSelector((state) => state.employees.employees);
  const [sortColumn, setSortColumn] = useState(null); // Colonne de tri
  const [sortOrder, setSortOrder] = useState("asc"); // Ordre de tri initial
  const [employeesPerPage, setEmployeesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const handleSort = (column) => {
    // Réinitialisez l'ordre de tri à ascendant pour une nouvelle colonne
    setSortColumn(column);
    setSortOrder("asc");
    // Inversez l'ordre de tri si la colonne est déjà sélectionnée

    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }
  };
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const compareDates = (dateA, dateB) => {
    const parsedDateA = parseDate(dateA);
    const parsedDateB = parseDate(dateB);

    if (parsedDateA < parsedDateB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (parsedDateA > parsedDateB) {
      return sortOrder === "asc" ? 1 : -1;
    }

    return 0; // Les dates sont égales
  };

  const getSortedEmployees = () => {
    let sortedEmployees = [...employees];

    if (sortColumn === "dateOfBirth" || sortColumn === "startDate") {
      // Triez les employés en fonction de la colonne de tri (ordre chronologique)
      sortedEmployees.sort((a, b) =>
        compareDates(a[sortColumn], b[sortColumn])
      );
    } else if (sortColumn) {
      // Triez les employés en fonction de la colonne de tri (ordre alphabétique)
      sortedEmployees.sort((a, b) => {
        return sortOrder === "asc"
          ? a[sortColumn].localeCompare(b[sortColumn])
          : b[sortColumn].localeCompare(a[sortColumn]);
      });
    }

    return sortedEmployees;
  };

  const handleEmployeesPerPageChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setEmployeesPerPage(selectedValue);
    setCurrentPage(1)
  };

  // Fonction pour gérer le changement de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const sortedEmployees = getSortedEmployees();

  // Calcul de l'index de début et de fin
  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  console.log(startIndex);
  console.log(endIndex);
  const visibleEmployees = sortedEmployees.slice(startIndex, endIndex);
  console.log(visibleEmployees);

  return (
    <div>
      <div className="headerTable">
        <h2>Employee List</h2>
        <Link to="/">Create Employee</Link>
        <label>
          Show
          <select
            value={employeesPerPage}
            onChange={handleEmployeesPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          employees per page
        </label>
      </div>
      <div>
        <table className="tableEmployee">
          <thead>
            <tr>
              <th className="pointer" onClick={() => handleSort("firstName")}>
                First Name{" "}
                {sortColumn === "firstName"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("lastName")}>
                Last Name{" "}
                {sortColumn === "lastName"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("dateOfBirth")}>
                Date of Birth{" "}
                {sortColumn === "dateOfBirth"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("startDate")}>
                Start Date{" "}
                {sortColumn === "startDate"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("street")}>
                Street{" "}
                {sortColumn === "street"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("city")}>
                City{" "}
                {sortColumn === "city"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("state")}>
                State{" "}
                {sortColumn === "state"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("zipCode")}>
                Zip Code{" "}
                {sortColumn === "zipCode"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
              <th className="pointer" onClick={() => handleSort("department")}>
                Department{" "}
                {sortColumn === "department"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleEmployees.map((employee, index) => (
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
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <div className="pageSquare">{currentPage}</div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === Math.ceil(employees.length / employeesPerPage)}
      >
        Next
      </button>
    </div>
    </div>
  );
}
