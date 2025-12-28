import React, { useEffect, useState } from "react";
import api from "../api/apiClient";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [password] = useState("Welcome@123"); // default password
  const [banner, setBanner] = useState("");

  const load = () => {
    api.get("/users").then((res) => setUsers(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", {
        email,
        full_name: fullName,
        password,
        is_admin: isAdmin,
        is_active: true
      });
      setBanner("User created with default password Welcome@123");
      setEmail("");
      setFullName("");
      setIsAdmin(false);
      load();
    } catch (err) {
      setBanner("Error creating user (maybe email exists)");
    }
  };

  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
    load();
  };

  return (
    <div>
      <h2>User Management</h2>
      {banner && <div className="banner">{banner}</div>}

      <form className="user-form" onSubmit={createUser}>
        <input
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label className="checkbox">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Admin?
        </label>
        <button className="btn-primary" type="submit">
          Add User
        </button>
      </form>

      <h3>Existing Users</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.full_name}</td>
              <td>{u.is_admin ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn-secondary"
                  onClick={() => deleteUser(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
