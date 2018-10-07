import Link from 'redux-first-router-link';
import React from 'react';
import axios from 'axios';
import styles from './index.css';

class Dealfinder extends React.Component {
  constructor() {
    super();
    this.state = {
      offers: {},
      filters: [],
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

    event.target.classList.toggle(styles.active);
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
        className={styles.toggleSizeButton}
        key={size}
        onClick={event => this.handleClick(event, size, index)}
      >
        {size}
      </button>
    ));
  }

  getOffers() {
    if (!this.state.filters.length) {
      return [];
    }
    return Object.entries(this.state.offers).filter(([, offer]) => {
      return this.state.filters
        .some(filter => offer.sizes.indexOf(filter) !== -1);
    });
  }

  render() {
    return (
      <section className={styles.dealfinder}>
        <header className={styles.header}>
          <h1 className={styles.title}>Кроссовки на скидках
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

          <div className={styles.filter}>
            <h2 className={styles.subtitle}>Фильтр размеров</h2>
            {this.getSizesButtons()}
          </div>

          <ul className={styles.offers}>
            {
              (this.getOffers() == 0)
                ? (<li className={styles.warning}>↑ Выбери размер ↑</li>)
                : (
                    this.getOffers().map(([offerId, offer]) => (
                      <li className={styles.offer} key={offerId}>
                        <h3 className={styles.name}>
                          { offer.name }
                          {' @ '}
                          { offer.store }
                        </h3>
                        <p className={styles.price}>
                          Цена:
                          {' '}
                          <del>{offer.oldPrice}</del>
                          {' '}
                          { offer.newPrice }
                        </p>
                        <p className={styles.sizes}>
                          Размеры:
                          {' '}
                          {offer.sizesType }
                          <br />
                          {
                            offer.sizes
                              .map(size => <div className={styles.size} key={size}>{size}</div>)
                          }
                        </p>
                      </li>
                    ))
                )
            }
          </ul>
        </main>
      </section>
    );
  }
}

export default Dealfinder;
