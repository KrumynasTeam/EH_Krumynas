import React, { useState, createContext } from "react";

type User = {
  id: number,
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  profileImage?: string;
  createdAt: string;
  country?: string;
  street?: string;
  addressLine1?: string;
  addressLine2?: string;
  role: number
};

type UserContextType = {
  user: User | null;
  token?: string | null;
  error?: string | null;
  isLoading: boolean;
  Login: (usernameOrEmail: string, password: string) => void;
  Register: (email: string, username: string, password: string) => void;
  Logout: () => void;
  GetToken: () => string | null;
  GetRole: () => number | null;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = (props: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const UpdateUserData = async (_token?:string) => {
    setIsLoading(true);
    await fetch(process.env.REACT_APP_API_URL + 'User', {
      method: 'GET',
      headers: {
        'Authorization': _token === null ? token : _token
      },
    }).then(response => response.json())
    .then(data => {
      if (data.isError == true) {
        setError(data.error.message);
      } else {
        setError(null);
      }
      setIsLoading(false);
      setUser(data.result)
    }).catch(err => console.log(err));
  }

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
        setError(data.error.message);
      } else {
        setError(null);
        const retrievedToken = 'bearer ' + data.result;
        localStorage.setItem('token', retrievedToken);
        UpdateUserData(retrievedToken)
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

  const GetRole = () => {
    let foundToken = localStorage.getItem('token');
    UpdateUserData(foundToken);
    if(user == null){
      return null;
    }
    return user.role;
  }

  return (
    <UserContext.Provider value={{ user, token, error, isLoading, Login, Register, Logout, GetToken, GetRole }}>
      {props.children}
    </UserContext.Provider>
  );
};