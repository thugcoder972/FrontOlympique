import { makeAutoObservable, action } from "mobx";
import { registerUser } from '../register/registerApi';

class RegisterViewModel {
    username = '';
    email = '';
    password = '';
    tel = '';
    type = 'acheteur';
    errorMessage = '';
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
        console.log("RegisterViewModel initialized");
    }

    handleChange = action((field, value) => {
        console.log(`Field ${field} changed to:`, value);
        this[field] = value;
    });

    validateFields = action(() => {
        console.log("Validating fields - current values:", {
            username: this.username,
            password: this.password
        });

        if (!this.username.trim()) {
            this.errorMessage = "Le nom d'utilisateur est requis";
            return false;
        }
        if (!this.password.trim()) {
            this.errorMessage = "Le mot de passe est requis";
            return false;
        }
        if (this.password.length < 6) {
            this.errorMessage = "Le mot de passe doit contenir au moins 6 caractères";
            return false;
        }

        this.errorMessage = '';
        return true;
    });

    handleRegister = action(async (e, navigate) => {
        e.preventDefault();
        console.log("Register form submitted");

        if (!this.validateFields()) return;

        this.isLoading = true;

        const userData = {
            username: this.username,
            email: this.email,
            password: this.password,
            tel: this.tel,
            type: this.type,
        };

        console.log("Sending registration request with data:", { ...userData, password: '***' });

        try {
            await registerUser(userData);
            console.log("Registration successful");
            this.resetForm();
            navigate('/login');
        } catch (error) {
            console.error("Registration error:", error);
            this.errorMessage = error.message || "Erreur lors de l'inscription";
        } finally {
            this.isLoading = false;
            console.log("Registration process completed");
        }
    });

    resetForm = action(() => {
        console.log("Resetting form");
        this.username = '';
        this.email = '';
        this.password = '';
        this.tel = '';
        this.type = 'acheteur';
        this.errorMessage = '';
    });
}

export default RegisterViewModel;
