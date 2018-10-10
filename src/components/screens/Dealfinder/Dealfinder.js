import Link from 'redux-first-router-link';
import React from 'react';
import axios from 'axios';
import styles from './index.css';

class Dealfinder extends React.Component {
  constructor() {
    super();
    this.state = {
      deals: [],
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
        filters: [
          ...this.state.filters.slice(0, filterIndex),
          ...this.state.filters.slice(filterIndex + 1),
        ],
      });
    }
    console.log(this.state.filters);

    event.target.classList.toggle(styles.active);
  }

  componentDidMount() {
    axios.get('http://localhost:8080')
      .then((response) => {
        // console.log('RESPONSE:', response.data);
        this.setState({
          deals: response.data,
        });
      })
      .catch(console.log);
  }

  // getSizes() {
  // old approach ==============================
  //   return Object.entries(this.state.deals)
  //     .reduce((sizes, [, deal]) => {
  //       deal.sizes.forEach((size) => {
  //         const notExist = sizes.indexOf(size) === -1;

  //         if (notExist) {
  //           sizes.push(size);
  //         }
  //       });

  //       return sizes;

  // // new approach ====================
  //   console.log('deals:', this.state.deals);
  //   return this.state.deals
  //     .reduce((deal) => {
  //       const sizesStr = deal.message.match((/(?<=(uk|ru|us|eu)\s*).*/i));
  //       const sizes = sizesStr.split(', ');

  //       sizes.forEach((size) => {
  //         const notExist = sizes.indexOf(size) === -1;

  //         if (notExist) {
  //           sizes.push(size);
  //         }
  //       });

  //       return sizes;
  //     }, []);
  // }

  // getSizesButtons() {
  //   return this.getSizes().map((size, index) => (
  //     <button
  //       className={styles.toggleSizeButton}
  //       key={size}
  //       onClick={event => this.handleClick(event, size, index)}
  //     >
  //       {size}
  //     </button>
  //   ));
  // }

  getDeals() {
    return this.state.deals;
    // if (!this.state.filters.length) {
    //   return [];
    // }
    // return this.state.deals.filter((deal) => {
    //   console.log('OFFER:', deal);
    //   return this.state.filters
    //     .some(filter => deal.sizes.indexOf(filter) !== -1);
    // });
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
            {/* {this.getSizesButtons()} */}
          </div>

          <ul className={styles.deals}>
            {
              (this.getDeals() == 0)
                ? (<li className={styles.warning}>↑ Выбери размер ↑</li>)
                : (
                    this.getDeals().map(deal => (
                      (deal.message.match(/🍂Дайджест лучших предложений за день!🍂/))
                        ? ''
                        : (
                          <li className={styles.deal} key={deal.id}>
                            <h3 className={styles.name}>
                              {/* {deal.message.match(/.*(?=\n\nстарая)/)} */}
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
                              {deal.message.match(/(?<=(uk|ru|us|eu)\s*).*/i)}
                            </p>
                            <p className={styles.link}>
                              Ссылка:
                              <br />
                              <a href={deal.message.match(/http(s)*:.*\n/i)}>
                                {deal.message.match(/http:.*\n/i)}
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
