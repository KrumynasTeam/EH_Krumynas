import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { AllProducts } from './components/AllProducts';
import { Blogs } from './components/Blog/Blogs'
import { Blog } from './components/Blog/Blog'
import CreateBlog from './components/Blog/CreateBlog';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/flowers' component={AllProducts} />
        <Route path='/blogs' component={Blogs} />
        <Route path="/blog/:id" component={Blog} />
        <Route path="/createBlog" component={CreateBlog} />
      </Layout>
    );
  }
}
