import Link from 'redux-first-router-link';
import React from 'react';
import axios from 'axios';
import styles from './index.css';

class Dealfinder extends React.Component {
  constructor() {
    super();
    this.state = {
      deals: [],
      sizes: [],
      filters: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  getDeals(deals) {
    this.setState({
      deals,
    });
  }

  getSizes() {
    const sizesRegExp = /(?<=(?:UK|RU|US|EU)\s?)\d.*/;

    const sizes = this.state.deals.reduce((sizesArr, deal) => {
      if (deal.message.match(sizesRegExp)) {
        deal.message
          .match((sizesRegExp))[0]
          .split(', ')
          .forEach((size) => {
            const notExist = sizesArr.indexOf(size) === -1;

            if (notExist) {
              sizesArr.push(size);
            }
          });
      }

      return sizesArr;
    }, []);


    this.setState({
      sizes,
    });
  }

  componentDidMount() {
    axios.get('http://localhost:8080')
      .then((response) => {
        this.getDeals(response.data);
        this.getSizes();
      })
      .catch(console.log);
  }

  getDealsCards() {
    if (!this.state.filters.length) {
      return [];
    }

    return this.state.deals.filter(() => {

      return this.state.filters
        .some(filter => (
          this.state.sizes.indexOf(filter) !== -1
        ));
    });
  }

  // test() {
  //   console.log(this.state.sizes);
  // }

  handleClick(event, size) {
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

    event.target.classList.toggle(styles.active);
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
          <div className={styles.filter}>
            <h2 className={styles.subtitle}>Фильтр размеров</h2>
            {
              this.state.sizes.map((size, index) => (
                <button
                  className={styles.toggleSizeButton}
                  key={size}
                  onClick={event => this.handleClick(event, size, index)}
                >
                  {size}
                </button>
              ))
            }
          </div>

          {/* {this.test()} */}

          <ul className={styles.deals}>
            {
              (this.state.deals)
                ? (<li className={styles.warning}>↑ Выбери размер ↑</li>)
                : (
                  this.state.deals.map(deal => (
                    (deal.message.match(/дайджест/i))
                      ? ''
                      : (
                        <li className={styles.deal} key={deal.id}>
                          <h3 className={styles.name}>
                            {deal.message.match(/.*(?=\n\nстарая)/)}
                            {deal.message.match(/.*/)}
                          </h3>
                          <p className={styles.price}>
                            Цена:
                            {' '}
                            <del>{deal.message.match(/(?<=старая цена: )\d*/)}</del>
                            {' '}
                            {deal.message.match(/(?<=новая цена: )\d*/)}
                          </p>
                          <p className={styles.sizes}>
                            Размеры:
                            {' '}
                            {deal.message.match(/(?<=размеры: )uk|ru|us|eu/i)}
                            <br />
                            {deal.message.match(/(?<=(?:UK|RU|US|EU)\s*)\d.*/)}
                          </p>
                          <p className={styles.link}>
                            Ссылка:
                            <br />
                            <a href={deal.message.match(/http(s)*:.*\n/i)}>
                              {deal.message.match(/http(s)*:.*\n/i)}
                            </a>
                          </p>
                          <img
                            className={styles.photo}
                            src={deal.media.webpage.url}
                            alt={deal.media.webpage.type}
                          />
                        </li>
                      )
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
