import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { postSignUpUser } from '../utils/api';
import { AuthInput } from '../utils/types/AuthInput';

export const SignUp = () => {
  const navigate = useNavigate();
  const [signUpValues, setSignUpValues] = useState<AuthInput>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postSignUpUser(signUpValues).then(() => navigate('/login'));
  };

  return (
    <SignUpContainer>
      <FormContainer onSubmit={handleSubmit}>
        <LogoContainer>
          <img src={Logo} alt="Logo" />
          <h1>My Chatapp</h1>
        </LogoContainer>

        <InputContainer>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) =>
              setSignUpValues({ ...signUpValues, email: e.target.value })
            }
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@example.com"
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) =>
              setSignUpValues({ ...signUpValues, password: e.target.value })
            }
            type="password"
            id="password"
            name="password"
            placeholder="********"
          />
        </InputContainer>

        <Button type="submit">Sign Up</Button>

        <Span>
          Already have an account? <Link to="/login">Login</Link>
        </Span>
      </FormContainer>

      <ToastContainer />
    </SignUpContainer>
  );
};

const Span = styled.span`
  color: white;
  text-transform: uppercase;
  font-style: italic;

  a {
    text-decoration: none;
    color: #997af0;
    font-weight: bold;
    font-size: 1rem;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #4e0eff;
    }
  }
`;

const Button = styled.button`
  background-color: #997af0;
  color: white;
  padding: 1rem 2rem;
  font-weight: bold;
  border-radius: 0.4rem;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-transform: uppercase;

  &:hover {
    background-color: #4e0eff;
  }
`;

const SignUpContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #131324;
  gap: 1rem;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #00000076;
  gap: 2rem;
  border-radius: 1rem;
  padding: 3rem 5rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input {
    background-color: transparent;
    border: 1px solid #4e0eff;
    border-radius: 0.5rem;
    color: white;
    padding: 1rem;
    outline: 0;
    width: 100%;
    font-size: 1.25rem;
    line-height: 1.75rem;

    &:focus {
      border-color: #997af0;
    }

    &:hover {
      border-color: #997af0;
    }
  }

  label {
    color: white;
    font-style: italic;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  img {
    height: 50px;
  }

  h1 {
    color: white;
    text-transform: uppercase;
    font-size: 18px;
  }
`;
