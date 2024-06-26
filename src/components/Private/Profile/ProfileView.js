// src/components/Private/Profile/ProfileView.js

import React, { useEffect, useContext } from 'react';
import AuthContext from '../../../Contexts/authContext';
import styled from 'styled-components';
import { observer } from "mobx-react-lite";
import { useDependencies } from '../../../DependencyContext';

const ProfileView = observer(() => {
  const { user } = useContext(AuthContext);
  const { profileViewModel } = useDependencies();
console.log(profileViewModel.userData)
  useEffect(() => {
    if (user) {
      profileViewModel.loadUserData();
    }
  }, [user, profileViewModel]);

  if (profileViewModel.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Header>Profile</Header>
      {profileViewModel.message && <Message>{profileViewModel.message}</Message>}
      <Form onSubmit={profileViewModel.handleSubmit}>
        <FormField>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={profileViewModel.userData.username}
            onChange={(e) => profileViewModel.handleChange(e.target.name, e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profileViewModel.userData.email}
            onChange={(e) => profileViewModel.handleChange(e.target.name, e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <label>Phone:</label>
          <input
            type="tel"
            name="tel"
            value={profileViewModel.userData.tel}
            onChange={(e) => profileViewModel.handleChange(e.target.name, e.target.value)}
          />
        </FormField>
        <SubmitButton type="submit">Update Profile</SubmitButton>
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
`;

const Header = styled.h1`
  font-size: 2.5em;
  color: #ffffff;
  margin-bottom: 40px;
`;

const Message = styled.p`
  color: #ff0000;
  margin-bottom: 20px;
`;

const Form = styled.form`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const FormField = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
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

export default ProfileView;
