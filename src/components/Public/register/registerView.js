// src/components/Public/Register/Register.js

import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from "mobx-react-lite";
import { useDependencies } from '../../../DependencyContext';

const RegisterView = observer(() => {
  const { registerViewModel } = useDependencies();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    registerViewModel.handleRegister(e, navigate);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Header>Register</Header>
        {registerViewModel.errorMessage && <ErrorMessage>{registerViewModel.errorMessage}</ErrorMessage>}
        <FormField>
          <input
            type="text"
            value={registerViewModel.username}
            onChange={(e) => registerViewModel.handleChange('username', e.target.value)}
            placeholder="Username"
            required
          />
        </FormField>
        <FormField>
          <input
            type="email"
            value={registerViewModel.email}
            onChange={(e) => registerViewModel.handleChange('email', e.target.value)}
            placeholder="Email"
            required
          />
        </FormField>
        <FormField>
          <input
            type="password"
            value={registerViewModel.password}
            onChange={(e) => registerViewModel.handleChange('password', e.target.value)}
            placeholder="Password"
            required
          />
        </FormField>
        <FormField>
          <input
            type="tel"
            value={registerViewModel.tel}
            onChange={(e) => registerViewModel.handleChange('tel', e.target.value)}
            placeholder="Telephone"
          />
        </FormField>
        <FormField>
          <select value={registerViewModel.type} onChange={(e) => registerViewModel.handleChange('type', e.target.value)}>
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
});

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

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 20px;
`;

export default RegisterView;
