import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Utilisé pour la navigation
import RegisterViewModel from './RegisterViewModel';
import styled from 'styled-components';

// --- Composants stylisés ---
const FormContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #646cff;
  }
`;

const StyledSelect = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #535bf2;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ff3333;
  padding: 0.5rem;
  background: #ffeeee;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

// --- Composant principal ---
const RegisterView = observer(() => {
    console.log("[RENDER] RegisterView component rendering"); // [DEBUG]

    const navigate = useNavigate(); // ✅ Hook react-router
    const registerViewModel = useMemo(() => {
        console.log("[INIT] Creating new RegisterViewModel instance"); // [DEBUG]
        return new RegisterViewModel();
    }, []);

    return (
        <FormContainer>
            <StyledForm onSubmit={(e) => {
                console.log("[EVENT] Form submit triggered"); // [DEBUG]
                registerViewModel.handleRegister(e, navigate);
            }}>
                <h2>Inscription</h2>

                {registerViewModel.errorMessage && (
                    <ErrorMessage>
                        {registerViewModel.errorMessage}
                        {console.log("[ERROR] Displaying error:", registerViewModel.errorMessage)} // [DEBUG]
                    </ErrorMessage>
                )}

                <StyledInput
                    value={registerViewModel.username}
                    onChange={(e) => {
                        console.log("[INPUT] Username changed:", e.target.value); // [DEBUG]
                        registerViewModel.handleChange('username', e.target.value);
                    }}
                    placeholder="Nom d'utilisateur *"
                    required
                    onBlur={() => console.log("[FOCUS] Username field blurred")} // [DEBUG]
                />

                <StyledInput
                    type="email"
                    value={registerViewModel.email}
                    onChange={(e) => {
                        console.log("[INPUT] Email changed:", e.target.value); // [DEBUG]
                        registerViewModel.handleChange('email', e.target.value);
                    }}
                    placeholder="Email"
                    onBlur={() => console.log("[FOCUS] Email field blurred")} // [DEBUG]
                />

                <StyledInput
                    type="password"
                    value={registerViewModel.password}
                    onChange={(e) => {
                        console.log("[INPUT] Password changed:", e.target.value); // [DEBUG]
                        registerViewModel.handleChange('password', e.target.value);
                    }}
                    placeholder="Mot de passe * (6 caractères minimum)"
                    minLength="6"
                    required
                    onBlur={() => console.log("[FOCUS] Password field blurred")} // [DEBUG]
                />

                <StyledInput
                    type="tel"
                    value={registerViewModel.tel}
                    onChange={(e) => {
                        console.log("[INPUT] Telephone changed:", e.target.value); // [DEBUG]
                        registerViewModel.handleChange('tel', e.target.value);
                    }}
                    placeholder="Téléphone"
                    onBlur={() => console.log("[FOCUS] Telephone field blurred")} // [DEBUG]
                />

                <StyledSelect
                    value={registerViewModel.type}
                    onChange={(e) => {
                        console.log("[SELECT] User type changed:", e.target.value); // [DEBUG]
                        registerViewModel.handleChange('type', e.target.value);
                    }}
                    onBlur={() => console.log("[FOCUS] Type select blurred")} // [DEBUG]
                >
                    <option value="acheteur">Acheteur</option>
                    <option value="vendeur">Vendeur</option>
                </StyledSelect>

                <SubmitButton
                    type="submit"
                    disabled={registerViewModel.isLoading}
                    onClick={() => console.log("[CLICK] Submit button clicked")}
                >
                    {registerViewModel.isLoading ? 'Inscription en cours...' : "S'inscrire"}
                    {console.log("[STATE] Loading state:", registerViewModel.isLoading)} // [DEBUG]
                </SubmitButton>
            </StyledForm>
        </FormContainer>
    );
});

export default RegisterView;
