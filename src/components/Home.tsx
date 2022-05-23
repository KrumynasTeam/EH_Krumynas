import React, { Component } from 'react';
import Hero from './Layout/Hero';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <><Hero /><Hero /></>
    );
  }
}
