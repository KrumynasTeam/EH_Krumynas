import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './custom.scss'
import { Home } from './components/Home';
import { AllProducts } from './components/AllProducts';
import { NavMenu } from './components/NavMenu';
import { UserProvider } from './components/contexts/UserContext';
import { LoginScreen } from './components/Login/LoginScreen';
import { RegisterScreen } from './components/Register/RegisterScreen';
import { FixedContactMessage } from './components/messenger/FixedContactMessage';
import { UploadImageExample } from './components/UploadImageExample';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
          <NavMenu />
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/flowers' element={<AllProducts/>} />
              <Route path='/login' element={<LoginScreen/>} />
              <Route path='/signup' element={<RegisterScreen/>} />
              <Route path='/image' element={<UploadImageExample/>} />
            </Routes>
      </BrowserRouter>
      <FixedContactMessage/>
    </UserProvider>
  );
}

export default App;
