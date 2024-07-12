import React, { useState, useEffect, useContext } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./admin.scss";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // State to track current user being edited
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("");
  const { currentUser: authUser } = useContext(AuthContext);

  const [showAddUserForm, setShowAddUserForm] = useState(false);
const [newUserUsername, setNewUserUsername] = useState("");
const [newUserEmail, setNewUserEmail] = useState("");
const [newUserPassword, setNewUserPassword] = useState("");
const [newUserRole, setNewUserRole] = useState("");


  const [loading, setLoading] = useState(true);


  const fetchUsers = async () => {
    try {
        const response = await makeRequest.get("/users");
        console.log("Users:", response.data); // Check if this logs an array
        if (Array.isArray(response.data)) {
            setUsers(response.data);
        } else {
            console.error("Expected an array but got:", response.data);
            setUsers([]); // Set to empty array to avoid errors
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Set to empty array on error to avoid further errors
    }
};

useEffect(() => {
  fetchUsers().finally(() => setLoading(false));
}, []);

if (loading) {
  return <div>Loading...</div>;
}

  const deleteUser = async (userId) => {
    try {
      console.log("Deleting user with ID:", userId);
      await makeRequest.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
      });
      fetchUsers(); // Refresh the user list after delete
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (userId, newUsername, newEmail, newRole) => {
    try {
      console.log("Updating user with ID:", userId);
      const response = await makeRequest.put(
        `/users/${userId}`,
        {
          username: newUsername,
          email: newEmail,
          role: newRole,
        },
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      console.log("Update response:", response.data); // Log response data to check if update is successful

      // Update state of users after successful update
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, username: newUsername, email: newEmail, role: newRole } : user
        )
      );

      setCurrentUser(null); // Clear current user after update
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleUpdateClick = () => {
    if (currentUser) {
      updateUser(currentUser.id, newUsername, newEmail, newRole);
    }
  };

  const handleCancelUpdate = () => {
    setCurrentUser(null); // Clear current user when cancelling update
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setNewUsername(user.username);
    setNewEmail(user.email);
    setNewRole(user.role);
  };

  const addUser = async () => {
    try {
      const response = await makeRequest.post(
        "/auth/register",
        {
          username: newUserUsername,
          email: newUserEmail,
          password: newUserPassword,
          role: newUserRole,
        },
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      console.log("Add user response:", response.data); // Log response data to check if add is successful
  
      // Update state of users after successful addition
      fetchUsers();
  
      // Clear the form and hide it after successful addition
      setNewUserUsername("");
      setNewUserEmail("");
      setNewUserPassword("");
      setNewUserRole("");
      setShowAddUserForm(false);
    } catch (error) {
      console.error("Error adding user:", error);
      // Handle error (e.g., show error message to user)
    }
  };
  

  return (
    <div>
      <h1>Admin Panel - Manage Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEditClick(user)}>Update</button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
  
      <button onClick={() => setShowAddUserForm(!showAddUserForm)}>
        {showAddUserForm ? "Cancel" : "Add User"}
      </button>
  
      {/* Add User Form */}
      {showAddUserForm && (
        <div>
          <h2>Add New User</h2>
          <label>Username:</label>
          <input
            type="text"
            value={newUserUsername}
            onChange={(e) => setNewUserUsername(e.target.value)}
          />
          <label>Email:</label>
          <input
            type="email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
          />
          <label>Role:</label>
          <input
            type="text"
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
          />
          <button onClick={addUser}>Save</button>
        </div>
      )}
  
      {/* Update Dialog */}
      {currentUser && (
        <div>
          <h2>Update User</h2>
          <label>Username:</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <label>Email:</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <label>Role:</label>
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
          <button onClick={handleUpdateClick}>Save</button>
          <button onClick={handleCancelUpdate}>Cancel</button>
        </div>
      )}
    </div>
  );
  

};

export default Admin;
