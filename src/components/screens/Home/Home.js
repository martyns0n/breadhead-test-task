/* eslint-disable */

import React from 'react';
import axios from 'axios'
import Link from 'redux-first-router-link';
import { forEach } from 'async';
import styles from './index.css';
import _ from 'lodash';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      offers: {}
    }
  }

  componentDidMount() {
    const component = this;

    axios.get('http://localhost:8080')
    .then( (response) => {
      component.setState({
        offers: response.data,
      });
      
      {_.map(Object.entries(this.state.offers), (x, i) => {
        return (
          console.log(x)
        )
      })}
    })
    .catch(console.log);

  }

  render() {
    return (
      <React.Fragment>
        <h1>Кроссовки на скидках ⚡</h1>
        <ul className={styles.offers}>

          {_.map(Object.keys(this.state.offers), (offer, i) => {
            return (
              <li className={styles.offer} key={i}>
                <h2 className={styles.title}>
                  { this.state.offers.offer1.name }
                </h2>
                <h3 className={styles.subtitle}>
                  { this.state.offers.offer1.store }
                </h3>
                <p className={styles.oldPrice}>
                  Старая цена:
                  {' '}
                  { this.state.offers.offer1.oldPrice }
                </p>
                <p className={styles.newPrice}>
                  Новая цена: 
                  {' '}
                  { this.state.offers.offer1.newPrice }
                </p>
                <p className={styles.sizes}> 
                  Размеры: 
                  {' '}
                  { this.state.offers.offer1.sizeType }
                  {' '}
                  {
                    this.state.offers.offer1.sizes
                    ? this.state.offers.offer1.sizes.join(', ')
                    : ''
                  }
                </p>
              </li>
            )
          })}
        </ul>
      </React.Fragment>
    )
  }
}

export default Home;
