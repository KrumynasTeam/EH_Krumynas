import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import  Navbar  from './Layout/Navbar';

export class Layout extends Component<any> {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Navbar />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
