import React, { useState, createContext } from "react";

type User = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
};

type UserContextType = {
  user?: User;
  token?: string;
  error?: string;
  isLoading: boolean;
  Login: (usernameOrEmail: string, password: string) => void;
  Register: (email: string, username: string, password: string) => void;
  Logout: () => void;
  GetToken: () => string;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = (props: { children: any }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>(null);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const Login = async (usernameOrEmail: string, password: string) => {
    setIsLoading(true);
    await fetch(process.env.REACT_APP_API_URL + 'Auth/Login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "usernameOrEmail": usernameOrEmail,
        "password": password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.isError == true) {
        console.log(data.error.message);
        setError(data.error.message);
      }
      else {
        console.log(data);
        setError(null);
        console.log('bearer ' + data.result);
        localStorage.setItem('token', 'bearer ' + data.result);
        setToken('bearer ' + data.result);
      }
      setIsLoading(false);
    })
    .catch(err => console.log(err));
  };

  const Register = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    await fetch(process.env.REACT_APP_API_URL + 'Auth/Register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": email,
        "username": username,
        "password": password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.isError == true) {
        console.log(data.error.message);
        setError(data.error.message);
      }
      else {
        console.log(data);
        setError(null);
        localStorage.setItem('token', 'bearer ' + data.result);
        setToken('bearer ' + data.result);
      }
      setIsLoading(false);
    })
    .catch(err => console.log(err));
  };

  const Logout = async () => {
    setIsLoading(true);
    setUser(null);
    localStorage.clear();
    setToken(null);
    setIsLoading(false);
    window.location.reload();
  };

  const GetToken = () => {
    const s = localStorage.getItem('token');
    return s;
  };

  return (
    <UserContext.Provider value={{ user, token, error, isLoading, Login, Register, Logout, GetToken }}>
      {props.children}
    </UserContext.Provider>
  );
};