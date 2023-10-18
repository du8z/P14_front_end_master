import "./EmployeeList.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function EmployeeList() {
  const employees = useSelector((state) => state.employees.employees);
  const [sortColumn, setSortColumn] = useState(null); // Colonne de tri
  const [sortOrder, setSortOrder] = useState("asc"); // Ordre de tri initial

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
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // Mois est 0-indexé dans les objets Date
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
    // Triez les employés en fonction de la colonne de tri (dateOfBirth ou startDate)
    sortedEmployees.sort((a, b) => compareDates(a[sortColumn], b[sortColumn]));
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

  const sortedEmployees = getSortedEmployees();

  return (
    <div>
      <div className="headerTable">
        <h2>Employee List</h2>
        <Link to="/">Create Employee</Link>
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
            {sortedEmployees.map((employee, index) => (
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
    </div>
  );
}
