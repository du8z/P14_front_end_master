import "./EmployeeList.css";

export default function EmployeeList() {
  return (
    <div>
      <div id="employee-div" className="container">
        <h1>Current Employees</h1>
        <table id="employee-table" className="display"></table>
        <a href="/">Home</a>
      </div>
    </div>
  );
}
