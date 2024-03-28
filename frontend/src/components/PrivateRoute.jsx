import React from 'react';
import { Route, Redirect, Link, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const PrivateRoute = ({ children }) => {
  return (
    console.log(isAuthenticated()), 
    isAuthenticated()?children:<Navigate to={"/login"}/>
    )
}

export default PrivateRoute;