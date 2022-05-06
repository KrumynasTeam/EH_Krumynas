import React, { Component } from 'react';

export class AllProducts extends Component {

  constructor(props) {
    super(props);
    this.state = { products: [], loading: true };
  }

  componentDidMount() {
    this.populateData();
  }

  static renderProductsList(products) {
    return (
      <ul>
        {products.map((product) => product.name)}
      </ul>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : AllProducts.renderProductsList(this.state.products);

    return (
      <div>
        <h1>Our Products</h1>
        {contents}
      </div>
    );
  }

  async populateData() {
    const response = await fetch(process.env.REACT_APP_API_URL + 'Product');
    const data = await response.json();
    this.setState({ products: data, loading: false });
  }
}
