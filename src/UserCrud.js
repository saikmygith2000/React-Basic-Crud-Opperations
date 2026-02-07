import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3001/users";

function UserCrud() {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  // CREATE
  const addUser = async () => {
    await axios.post(API, { name, email });
    setName("");
    setEmail("");
    loadUsers();
  };

  // DELETE
  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`);
    loadUsers();
  };

  // EDIT
  const editUser = (user) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  // UPDATE
  const updateUser = async () => {
    await axios.put(`${API}/${editId}`, { name, email });
    setEditId(null);
    setName("");
    setEmail("");
    loadUsers();
  };
  
  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  };

  const smallBtn = {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    marginLeft: "6px",
    cursor: "pointer"
  };


  return (
	<div style={{
	  minHeight: "100vh",
	  background: "linear-gradient(135deg,#667eea,#764ba2)",
	  display: "flex",
	  alignItems: "center",
	  justifyContent: "center"
	}}>

	  <div style={{
	    background: "#fff",
	    padding: "30px",
	    borderRadius: "16px",
	    width: "420px",
	    boxShadow: "0 20px 40px rgba(0,0,0,.2)"
	  }}>

	    <h2 style={{ marginBottom: "5px" }}>User Management</h2>
	    <p style={{ color: "#777", marginBottom: "20px" }}>
	      Simple React CRUD Dashboard
	    </p>

	    <input
	      placeholder="Full Name"
	      value={name}
	      onChange={e => setName(e.target.value)}
	      style={inputStyle}
	    />

	    <input
	      placeholder="Email Address"
	      value={email}
	      onChange={e => setEmail(e.target.value)}
	      style={inputStyle}
	    />

	    <button
	      onClick={editId ? updateUser : addUser}
	      style={{
	        width: "100%",
	        padding: "12px",
	        borderRadius: "8px",
	        border: "none",
	        background: "#667eea",
	        color: "#fff",
	        fontWeight: "600",
	        cursor: "pointer",
	        marginBottom: "20px"
	      }}
	    >
	      {editId ? "Update User" : "Add User"}
	    </button>

	    <h4 style={{ marginBottom: "10px" }}>Users</h4>

	    {users.map(u => (
	      <div key={u.id} style={{
	        background: "#f7f8fc",
	        padding: "10px",
	        borderRadius: "10px",
	        marginBottom: "10px",
	        display: "flex",
	        justifyContent: "space-between",
	        alignItems: "center"
	      }}>

	        <div>
	          <strong>{u.name}</strong>
	          <div style={{ fontSize: "12px", color: "#777" }}>{u.email}</div>
	        </div>

	        <div>
	          <button onClick={() => editUser(u)} style={smallBtn}>Edit</button>
	          <button onClick={() => deleteUser(u.id)} style={{ ...smallBtn, background:"#ff4d4f" }}>
	            Delete
	          </button>
	        </div>

	      </div>
	    ))}

	  </div>
	</div>


  );
}

export default UserCrud;
