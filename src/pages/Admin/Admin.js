import React, { useState } from "react";

const Admin = () => {
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeRole, setEmployeeRole] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  // Employee CRUD operations
  const addEmployee = () => {
    if (employeeName.trim() && employeeRole.trim()) {
      setEmployees([
        ...employees,
        { id: Date.now(), name: employeeName, role: employeeRole },
      ]);
      setEmployeeName("");
      setEmployeeRole("");
    }
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const assignRole = (id, newRole) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, role: newRole } : employee
      )
    );
  };

  // Product CRUD operations
  const addProduct = () => {
    if (productName.trim() && productPrice.trim()) {
      setProducts([
        ...products,
        { id: Date.now(), name: productName, price: productPrice },
      ]);
      setProductName("");
      setProductPrice("");
    }
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const startEditProduct = (product) => {
    setEditingProduct(product);
    setProductName(product.name);
    setProductPrice(product.price);
  };

  const saveProduct = () => {
    if (editingProduct && productName.trim() && productPrice.trim()) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? { ...product, name: productName, price: productPrice }
            : product
        )
      );
      setEditingProduct(null);
      setProductName("");
      setProductPrice("");
    }
  };

  return (
    <div className="admin-container">
      <h1>TRANG CHO ADMIN</h1>

      {/* Employee Management */}
      <div className="admin-section">
        <h2>Manage Employees</h2>
        <div className="form">
          <input
            type="text"
            placeholder="Enter Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Role (e.g., Manager, Cashier)"
            value={employeeRole}
            onChange={(e) => setEmployeeRole(e.target.value)}
          />
          <button onClick={addEmployee}>Add Employee</button>
        </div>
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              <div>
                <strong>#{employee.id}</strong> {employee.name} -{" "}
                <em>{employee.role}</em>
              </div>
              <div>
                <button
                  onClick={() =>
                    assignRole(
                      employee.id,
                      prompt("Enter new role:", employee.role)
                    )
                  }
                >
                  Assign Role
                </button>
                <button onClick={() => deleteEmployee(employee.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Product Management */}
      <div className="admin-section">
        <h2>Manage Products</h2>
        <div className="form">
          <input
            type="text"
            placeholder="Enter Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          {editingProduct ? (
            <button onClick={saveProduct}>Save Changes</button>
          ) : (
            <button onClick={addProduct}>Add Product</button>
          )}
        </div>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price} VND{" "}
              <button onClick={() => startEditProduct(product)}>Edit</button>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
