import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './custom.scss'
import { Home } from './components/Home';
import { AllProducts } from './components/AllProducts';
import { NavMenu } from './components/NavMenu';
import { LoginScreen } from './components/Login/LoginScreen';
import { RegisterScreen } from './components/Register/RegisterScreen';
import { UploadImageExample } from './components/UploadImageExample';
import BlogsList from './components/Blog/BlogsList';
import CreateBlog from './components/Blog/CreateBlog';
import BlogDetails from './components/Blog/BlogDetails';
import { UserSettingsScreen } from './components/UserSettings/UserSettingsScreen';

const App = () => {
  return (
    <BrowserRouter>
        <NavMenu />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/flowers' element={<AllProducts/>} />
            <Route path='/login' element={<LoginScreen/>} />
            <Route path='/signup' element={<RegisterScreen/>} />
            <Route path='/account' element={<UserSettingsScreen/>} />
            <Route path='/image' element={<UploadImageExample/>} />
            <Route path='/blogs' element={<BlogsList/>} />
            <Route path='blog/:id' element={<BlogDetails/>} />
            <Route path="/blogs/createBlog" element={<CreateBlog/>} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
