import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component<any> {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu displayName={''} />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
