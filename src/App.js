//import logo from './logo.svg';
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { AllProducts } from './components/AllProducts';
import { NavMenu } from './components/NavMenu';
//import AllProducts from './components/AllProducts';

import './custom.css'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavMenu/>
        <Container>
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/flowers' element={<AllProducts/>} />
          </Routes>
        </Container>
      </BrowserRouter>
    );
  }
}
