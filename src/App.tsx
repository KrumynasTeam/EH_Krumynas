import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './custom.scss'
import { Home } from './components/Home';
import { AllProducts } from './components/product/AllProducts';
import { LoginScreen } from './components/Login/LoginScreen';
import { RegisterScreen } from './components/Register/RegisterScreen';
import BlogsList from './components/Blog/BlogsList';
import CreateBlog from './components/Blog/CreateBlog';
import BlogDetails from './components/Blog/BlogDetails';
import { UserSettingsScreen } from './components/UserSettings/UserSettingsScreen';
import  Footer  from './components/Layout/Footer/Footer';
import './components/Layout/layout.scss';
import NavBar from './components/Layout/Navbar';
import { UserContext } from './components/contexts/UserContext';
import EditBlog from './components/Blog/EditBlog';
import { OrdersAdminScreen } from './components/Orders/OrdersAdminScreen';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';

const App = () => {
  const {user} = useContext(UserContext);

  return (
    <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/flowers' element={<AllProducts/>} />
            <Route path='/login' element={<LoginScreen/>} />
            <Route path='/signup' element={user === null ? <RegisterScreen/> : <Home/>} />
            <Route path='/account' element={user !== null ? <UserSettingsScreen/> : <Home/>} />
            <Route path='/cart' element={<ShoppingCart/>} />
            <Route path='/blogs' element={<BlogsList/>} />
            <Route path='blog/:id' element={<BlogDetails/>} />
            <Route path="/blogs/createBlog" element={user?.role === 1 ? <CreateBlog/> : <Home/>} />
            <Route path='editBlog/:id' element={user?.role === 1 ? <EditBlog/> : <Home/>} />
            <Route path="/orders" element={user?.role === 1 ? <OrdersAdminScreen/> : <Home/>} />
          </Routes>
          <Footer/>
    </BrowserRouter>
  );
}

export default App;
