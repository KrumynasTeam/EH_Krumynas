import React, { useState, createContext, useEffect } from "react";

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
  isLoggedIn: boolean;
  Login: (usernameOrEmail: string, password: string) => void;
  Register: (email: string, username: string, password: string) => void;
  Logout: () => void;
  GetToken: () => string | null;
  GetUser: () => User | null;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const defaultConnectionError = "Could not establish connection to server. Please try again!";

  useEffect(() => {
    console.log('jungiasi');
    let _user: User = user || JSON.parse(localStorage.getItem('user'));
    setUser(_user);
    console.log('User: ' + _user);
    let _token = token || localStorage.getItem('token');
    setToken(_token);
    console.log('Token: ' + _token);
  }, [isLoggedIn])

  const UpdateUserData = async (_token?:string) => {
    setIsLoading(true);
    await fetch(process.env.REACT_APP_API_URL + 'User', {
      method: 'GET',
      headers: {
        'Authorization': _token === null ? token : _token
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.isError === true) {
        setError(data.error.message);
      } else {
        setError(null);
        localStorage.setItem('user', JSON.stringify(data.result));
        setIsLoggedIn(true);
        window.location.href = '/';
      }
    })
    .then(() => setIsLoading(false))
    .catch(err => console.log(err));
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
      if (data.isError === true) {
        setError(data.error.message);
      } else {
        setError(null);
        const retrievedToken = 'bearer ' + data.result;
        localStorage.setItem('token', retrievedToken);
        return retrievedToken;
      }
    })
    .then((retrievedToken) => {
      return UpdateUserData(retrievedToken);
    })
    .catch(() => {
      setIsLoading(false);
      setError(defaultConnectionError);
    });
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
      if (data.isError === true) {
        setError(data.error.message);
      } else {
        setError(null);
        const retrievedToken = 'bearer ' + data.result;
        localStorage.setItem('token', retrievedToken);
        return retrievedToken;
      }
    })
    .then((retrievedToken) => {
      return UpdateUserData(retrievedToken);
    })
    .catch(() => {
      setIsLoading(false);
      setError(defaultConnectionError);
    });
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
    return token || localStorage.getItem('token');
  };

  const GetUser = () => {
    return user || JSON.parse(localStorage.getItem('user'));
  }

  const GetRole = () => {
    let foundToken = localStorage.getItem('token');
    UpdateUserData(foundToken);
    if(user == null){
      return null;
    }
    return user.role;
  }

  return (
    <UserContext.Provider value={{ user, token, error, isLoading, isLoggedIn, Login, Register, Logout, GetToken, GetUser, GetRole }}>
      {props.children}
    </UserContext.Provider>
  );
};