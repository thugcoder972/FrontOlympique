import { makeAutoObservable } from "mobx";
import { registerUser } from '../register/registerApi';
import { CustomUser } from '../../../models/UserModel'; // Assurez-vous que le chemin est correct

class RegisterViewModel {
  username = '';
  email = '';
  password = '';
  tel = '';
  type = 'acheteur'; // valeur par défaut
  errorMessage = '';

  constructor() {
    makeAutoObservable(this);
  }

  handleChange = (field, value) => {
    this[field] = value;
  };

  handleRegister = async (e, navigate) => {
    e.preventDefault();
    try {
      const user = new CustomUser({
        username: this.username,
        email: this.email,
        password: this.password,
        tel: this.tel,
        type: this.type,
      });
      await registerUser(user);
      navigate('/login');
    } catch (error) {
      this.errorMessage = error.message;
    }
  };
}

export default RegisterViewModel;
