/* eslint-disable */

import React from 'react';
import axios from 'axios'
import Link from 'redux-first-router-link';
import { forEach } from 'async';
import styles from './index.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      offers: {
        offer1: {},
        offer2: {}
      }
    }
  }

  componentDidMount() {
    const component = this;

    axios.get('http://localhost:8080')
    .then( (response) => {
      component.setState({
        offers: response.data
      });
    })
    .catch(console.log);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Кроссовки на скидках</h1>
        <ul className={styles.offers}>
          <li className={styles.offer}>
            <h2 className="">
              { this.state.offers.offer1.name }
            </h2>
            <h3 className="">
              { this.state.offers.offer1.store }
            </h3>
            <div className="">
            { this.state.offers.offer1.oldPrice }
            </div>
            <div className="">
            { this.state.offers.offer1.newPrice }
            </div>
            <div className=""> 
            { this.state.offers.offer1.sizeType }
            </div>
            <div className=""> 
            { this.state.offers.offer1.sizes }
            </div>
          </li>
        </ul>
      </React.Fragment>
    )
  }
}

export default Home;
