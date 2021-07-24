import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");

  const handleLogout = async (e) => {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(user);

  return (
    <>
      <Card>
        <Card.Body className="w-100 text-center">
          {error && <Alert variant="danger">{error}</Alert>}
          {!user.displayName ? <h2> Profile </h2> : <h2> Welcome, {user.displayName}</h2>}
          {user.photoURL && (
            <img
              className="img-fluid mx-auto my-3 circle"
              style={{ maxWidth: "25%" }}
              src={user.photoURL}
              alt="display pic"
            />
          )}
          <p className='mt-2 mb-0'><strong>Email : {user.email} </strong></p>
          <Link className='mt-2 btn btn-primary w-100' to='/update'>Update Profile</Link>
        </Card.Body>
      </Card>
      <div className="mt-2">
        <Button className="w-100 btn" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  );
}

export default Dashboard;
