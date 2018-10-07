import Link from 'redux-first-router-link';
import React from 'react';
import axios from 'axios';
// import FilterButtons from '../../modules/FilterButtons';
import styles from './index.css';
import { every } from 'async';

class Dealfinder extends React.Component {
  constructor() {
    super();
    this.state = {
      offers: {},
      filters: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, size) {
    const filterIndex = this.state.filters.indexOf(size);

    if (filterIndex === -1) {
      this.setState({
        filters: [...this.state.filters, size],
      });
    } else {
      this.setState({
        filters: [...this.state.filters.slice(0, filterIndex), ...this.state.filters.slice(filterIndex + 1)],
      });
    }
    console.log(this.state.filters);

    event.target.classList.toggle('active');
  }

  componentDidMount() {
    axios.get('http://localhost:8080')
      .then((response) => {
        this.setState({
          offers: response.data,
        });
      })
      .catch(console.log);
  }

  getSizes() {
    return Object.entries(this.state.offers)
      .reduce((sizes, [, offer]) => {
        offer.sizes.forEach((size) => {
          const notExist = sizes.indexOf(size) === -1;

          if (notExist) {
            sizes.push(size);
          }
        });

        return sizes;
      }, []);
  }

  getSizesButtons() {
    return this.getSizes().map((size, index) => (
      <button
        className={styles.sizeToggleButton}
        key={size}
        onClick={event => this.handleClick(event, size, index)}
      >
        {size}
      </button>
    ));
  }

  getOffers() {
    if (!this.state.filters.length) {
      return Object.entries(this.state.offers);
    }
    return Object.entries(this.state.offers).filter(([, offer]) => {
      return this.state.filters
        .some(filter => offer.sizes.indexOf(filter) !== -1)
    });
  }

  render() {
    return (
      <React.Fragment>
        <header className={styles.header}>
          <h1>Кроссовки на скидках
            <span role="img" aria-label="thunder-emoji">⚡</span>
          </h1>
          <nav className={styles.navigation}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className={styles.main}>
          {/* <FilterButtons /> */}

          {this.getSizesButtons()}

          <ul className={styles.offers}>

            {
              // Object.entries(this.state.offers).map(([offerId, offer]) => (
              this.getOffers().map(([offerId, offer]) => (
                <li className={styles.offer} key={offerId}>
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
              ))}
          </ul>
        </main>
      </React.Fragment>
    );
  }
}

export default Dealfinder;
