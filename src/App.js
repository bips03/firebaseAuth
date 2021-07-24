import "./App.css";
import React from "react";
import Signup from "./components/Signup";
import { Container } from "react-bootstrap";
import { AuthContextProvider} from "./AuthContext";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute";
import Reset from './components/Reset'
import Update from "./components/Update";

function App() {
  
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "500px" }}>
      
        <Router>
          <AuthContextProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={ Login } />
              <Route path='/reset' component= {Reset} />
              <PrivateRoute path='/update' component={Update} />
            </Switch>
          </AuthContextProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
