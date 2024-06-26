// src/components/Private/Profile/ProfileViewModel.js

import { makeAutoObservable } from "mobx";
import { CustomUser } from '../../../models/UserModel';

class ProfileViewModel {
  userData = new CustomUser(null, '', '', '', '','');
  loading = true;
  message = '';
  user = null;
  fetchUserProfile;
  updateUserProfile;

  constructor(user, fetchUserProfile, updateUserProfile) {
    makeAutoObservable(this);
    this.user = user;
    this.fetchUserProfile = fetchUserProfile;
    this.updateUserProfile = updateUserProfile;
  }

  async loadUserData() {
    if (!this.user) {
      this.loading = false;
      return;
    }

    try {
      const data = await this.fetchUserProfile(this.user.token);
      this.userData = new CustomUser(data.id, data.username, data.email, data.tel, data.type);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      this.loading = false;
    }
  }

  handleChange = (name, value) => {
    this.userData = { ...this.userData, [name]: value };
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await this.updateUserProfile(this.user.token, this.userData);
      this.message = 'Profile updated successfully!';
    } catch (error) {
      console.error('Failed to update user profile:', error);
      this.message = error.message;
    }
  };
}

export default ProfileViewModel;
