import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tel, setTel] = useState('');
  const [type, setType] = useState('acheteur'); // valeur par défaut

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, tel, type }),
    });

    if (response.ok) {
      navigate('/login');
    } else {
      console.error('Failed to register');
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleRegister}>
        <Header>Register</Header>
        <FormField>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </FormField>
        <FormField>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </FormField>
        <FormField>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </FormField>
        <FormField>
          <input
            type="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            placeholder="Telephone"
          />
        </FormField>
        <FormField>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="acheteur">Acheteur</option>
            <option value="autre">Autre</option>
          </select>
        </FormField>
        <SubmitButton type="submit">Register</SubmitButton>
        <LoginLink>
          Already have an account? <NavLink to="/login">Login</NavLink>
        </LoginLink>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #808080;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Header = styled.h1`
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 20px;

  input,
  select {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
`;

const SubmitButton = styled.button`
  background-color: #44545c;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  
  &:hover {
    background-color: #70acac;
  }
`;

const LoginLink = styled.p`
  margin-top: 20px;
  font-size: 1em;
  color: #333;

  a {
    color: #70acac;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Register;
