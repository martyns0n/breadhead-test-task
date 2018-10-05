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
      offers: {},
      sizes: [],
      selectedSize: "make your choise"
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({selectedSize: event.target.value});
  }

  handleSubmit(event) {
    alert('Selected size is: ' + this.state.selectedSize);
    event.preventDefault();
  }

  componentDidMount() {
    const component = this;

    axios.get('http://localhost:8080')
    .then( (response) => {
      component.setState({
        offers: response.data,
      });
      
    })
    .catch(console.log);
  }

  render() {
    return (
      <React.Fragment>
        <h1>Кроссовки на скидках ⚡</h1>
        <ul className={styles.offers}>

          {_.map(Object.entries(this.state.offers), (obj, i) => {
            let offer = obj[1];
            // console.log('⭐', offer);

            _.map(offer.sizes, (size, i) => {
              if (this.state.sizes.indexOf(size)) {
                this.state.sizes.push(size);
              }
            })

            return (
              <li className={styles.offer} key={i}>
                <h2 className={styles.title}>
                  { offer.name }
                </h2>
                <h3 className={styles.subtitle}>
                  { offer.store }
                </h3>
                <p className={styles.oldPrice}>
                  Старая цена:
                  {' '}
                  { offer.oldPrice }
                </p>
                <p className={styles.newPrice}>
                  Новая цена: 
                  {' '}
                  { offer.newPrice }
                </p>
                <p className={styles.sizes}> 
                  Размеры: 
                  {' '}
                  { offer.sizeType }
                  {' '}
                  {
                    offer.sizes
                    ? offer.sizes.join(', ')
                    : ''
                  }
                </p>
              </li>
            )
          })}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <label> Фильтр
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="make your choise">make your choise</option>
              {
                _.map(Object.entries(this.state.sizes), (size, i) => {
                  return (
                    <option key={i} value={size[1]}>{size[1]}</option>
                  )
                })
              }
              
            </select>
          </label>
          <input type="submit" value="Submit"/>
        </form>

        {/* <button></button> */}

      </React.Fragment>
    )
  }
}

export default Home;
