import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Contexts/authContext';
import styled from 'styled-components';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    tel: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://backend-strapi.online/api.jeuxolympiques.com/api/user-profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        setUserData({
          username: data.username,
          email: data.email,
          tel: data.tel
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-strapi.online/api.jeuxolympiques.com/api/user-profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        setMessage('Profile updated successfully!');
      } else {
        const data = await response.json();
        setMessage(`Failed to update profile: ${data.detail}`);
      }
    } catch (error) {
      console.error('Failed to update user profile:', error);
      setMessage('Failed to update profile.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Header>Profile</Header>
      {message && <Message>{message}</Message>}
      <Form onSubmit={handleSubmit}>
        <FormField>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </FormField>
        <FormField>
          <label>Phone:</label>
          <input
            type="tel"
            name="tel"
            value={userData.tel}
            onChange={handleChange}
          />
        </FormField>
        <SubmitButton type="submit">Update Profile</SubmitButton>
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

export default Profile;
