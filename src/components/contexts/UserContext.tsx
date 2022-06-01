import React, { useState, createContext, useEffect } from "react";

export type User = {
  id: number,
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  profileImage?: string;
  createdAt?: string;
  country?: string;
  street?: string;
  addressLine1?: string;
  addressLine2?: string;
  role: number
};

type UserContextType = {
  user: User | null;
  cartId: number | null;
  token?: string | null;
  error?: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  Login: (usernameOrEmail: string, password: string) => void;
  Register: (email: string, username: string, password: string) => void;
  Logout: () => void;
  UpdateProfileImage: (url: string | null) => void;
  UpdateUserData: (token: string | null, redirect: boolean | null) => void;
  UpdateCartId: (cartId: number | null) => void;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = (props: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cartId, setCartId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const defaultConnectionError = "Could not establish connection to the server. Please try again!";

  useEffect(() => {
    let _user: User = user || JSON.parse(localStorage.getItem('user'));
    setUser(_user);
    let _token = token || localStorage.getItem('token');
    setToken(_token);
    let _cartId = cartId || localStorage.getItem('cartId');
    if (_cartId != null){
      setCartId(Number(_cartId));
    }
  }, [isLoggedIn])

  const UpdateUserData = async (_token?:string, redirect?: boolean) => {
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
        if (redirect)
          window.location.href = '/';
      }
    })
    .then(() => setIsLoading(false))
    .catch(() => setError(defaultConnectionError));
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
      return UpdateUserData(retrievedToken, true);
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
      return UpdateUserData(retrievedToken, true);
    })
    .catch(() => {
      setIsLoading(false);
      setError(defaultConnectionError);
    });
  };

  const Logout = async () => {
    setIsLoading(true);
    let cartId = localStorage.getItem('cartId');
    localStorage.clear();
    localStorage.setItem('cartId', cartId);
    setUser(null);
    setToken(null);
    setIsLoading(false);
    window.location.reload();
  };

  const UpdateProfileImage = async (url: string | null) => {
    setIsLoading(true);
    await fetch(process.env.REACT_APP_API_URL + 'User',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        "profileImage": (url == null ? "" : url),
        "mergeAll": false
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.isError === true) {
        setError(data.error.message);
      } else {
        setError(null);
        localStorage.setItem('user', JSON.stringify(data.result));
        setUser(data.result);
        setIsLoading(false);
      }
    })
    .catch(() => {
      setIsLoading(false);
      setError(defaultConnectionError);
    });
  };

  const UpdateCartId = (cartId: number) => {
    localStorage.setItem('cartId', cartId.toString());
    setCartId(cartId);
  }

  return (
    <UserContext.Provider value={{ cartId, user, token, error, isLoading, isLoggedIn, Login, Register, Logout, UpdateProfileImage, UpdateUserData, UpdateCartId }}>
      {props.children}
    </UserContext.Provider>
  );
};