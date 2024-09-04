import React from 'react';
import Login from '../components/Auth/Login/Login';
import { useNavigate } from 'react-router-dom';
import Register from '../components/Auth/Register/Register';

function RegisterCMS() {

  return (
    <div>
      <Register />
    </div>
  );
}

export default RegisterCMS;