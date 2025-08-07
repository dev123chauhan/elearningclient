import { useState } from "react";
import styled from 'styled-components';
import {toast} from 'sonner';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import useAuth from "../../hooks/useAuth";
import { FaRegEyeSlash, FaRegEye  } from "react-icons/fa";const Form = styled.form` 
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 16px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #53BFBA;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  margin-bottom: 10px;

  
`;



const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: space-between;
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: #49BBBD;
    border-color: #49BBBD;
  }

  &:checked::after {
    content: '✔';
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 14px;
    height: 100%;
  }
`;

const CheckboxLabel = styled.label`
  margin-right: auto;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const ShowPasswordIcon = styled.div`
  position: absolute;
  top: 45%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #53BFBA;
  font-size: 1.4rem;
`;

export default function LoginForm() {
  const API_URL = import.meta.env.VITE_API_URL
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleLogin = async (event) => {
      event.preventDefault();
      setLoading(true); 
      try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        const token = response.data.token;
        login(token);
        console.log(token)
        toast.success('Successfully logged in!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
        // setLoading(false); 
      } catch (error) {
        toast.error('Login failed. Please check your credentials.');
        setLoading(false); 
      }finally{
        setLoading(false);
      }
    };
   

    const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  return (
    <>
    <Form onSubmit={handleLogin}>
    <InputLabel>Email address</InputLabel>
    <Input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your User name" />
    <InputLabel>Password</InputLabel>
    <InputWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
          <ShowPasswordIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ?  <FaRegEye /> : <FaRegEyeSlash /> }
          </ShowPasswordIcon>
        </InputWrapper>
        <CheckboxContainer>
      <CheckboxInput
        type="checkbox"
        id="remember"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <CheckboxLabel htmlFor="remember">Remember me</CheckboxLabel>
    </CheckboxContainer>
    <Button type="submit">{loading ? <ClipLoader size={20} color={"#fff"} /> : "Login"}  </Button>
  
            
          
     
  </Form>
  
  </>
  )
}
