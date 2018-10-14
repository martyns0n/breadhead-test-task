import Link from 'redux-first-router-link';
import React from 'react';
import axios from 'axios';
import FilterButtons from '../../modules/FiterButtons';
import DealCards from '../../modules/DealCards';
import styles from './index.css';


class Dealfinder extends React.Component {
  constructor() {
    super();
    this.state = {
      deals: [],
      sizes: [],
      filters: [],
    };

    this.toggleFilter = this.toggleFilter.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8080')
      .then((response) => {
        this.getDeals(response.data);
        this.getSizes();
      })
      .catch(console.log);
  }

  getDeals(deals) {
    const sizesRegExp = /(?<=(?:UK|RU|US|EU)\s?)\d.*/; // return finded sizes after country code

    this.setState({
      deals: deals.map((deal) => {
        const match = deal.message.match(sizesRegExp);

        return {
          ...deal,
          sizes: match
            ? match[0].split(', ')
            : [],
        };
      }),
    });
  }

  getSizes() {
    // const sizesRegExp = /(?<=(?:UK|RU|US|EU)\s?)\d.*/; // return finded sizes after country code

    const sizes = this.state.deals.reduce((sizesArr, deal) => {
      deal.sizes.forEach((size) => {
        const notExist = sizesArr.indexOf(size) === -1;

        if (notExist) {
          sizesArr.push(size);
        }
      });

      return sizesArr;
    }, []);


    this.setState({
      sizes,
    });
  }

  toggleFilter(size) {
    const filterIndex = this.state.filters.indexOf(size);

    if (filterIndex === -1) {
      this.setState({
        filters: [...this.state.filters, size],
      });
    } else {
      this.setState({
        filters: [
          ...this.state.filters.slice(0, filterIndex),
          ...this.state.filters.slice(filterIndex + 1),
        ],
      });
    }
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

          <FilterButtons
            sizes={this.state.sizes}
            filters={this.state.filters}
            toggleFilter={this.toggleFilter}
          />

          <DealCards
            deals={this.state.deals}
            filters={this.state.filters}
          />

        </main>
      </section>
    );
  }
}

export default Dealfinder;
