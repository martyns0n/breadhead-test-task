import Link from 'redux-first-router-link';
import React from 'react';
import axios from 'axios';
// import FilterButtons from '../../modules/FilterButtons';
import styles from './index.css';

class Dealfinder extends React.Component {
  constructor() {
    super();
    this.state = {
      offers: {},
      sizes: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const size = event.target.textContent;
    const isExist = this.state.sizes.indexOf(size) > -1;
    const position = isExist ? this.state.sizes.indexOf(size) : null;

    if (isExist) {
      const afterRemoving = this.state.sizes.filter((item, index) => index !== position);
      // console.log('⭐', afterRemoving);
      this.setState(() => ({
        sizes: afterRemoving,
      }));
    } else {
      const afterAdding = this.state.sizes.push(size);
      this.setState(() => ({
        sizes: afterAdding,
      }));
    }

    event.target.classList.toggle('active');
  }

  componentDidMount() {
    // const component = this;

    axios.get('http://localhost:8080')
      .then((response) => {
        // console.log('RESPONSE:', response.data)
        this.setState({
          offers: response.data,
        });

        Object.entries(this.state.offers).map((obj) => {
          const offer = obj[1];
          // console.log('OFFER.SIZES:', offer.sizes);

          offer.sizes.map((size) => {
            // console.log(component.state.sizes);
            const isExist = this.state.sizes.indexOf(size) > -1;
            // console.log('😡', isExist);

            // console.log('PUSH:', this.state.sizes.push(size));
            if (!isExist) {
              this.setState((state) => {
                sizes: state.sizes.push(size);
              });
              console.log('SIZES:', this.state.sizes);
            }
          });
        });
        // console.log('OFFERS:', offers);
      })
      .catch(console.log);

    // console.log('SIZES:', this.state.sizes);

    // console.log('⚡', this.state.sizes);
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

          {
            Object.entries(this.state.sizes).map((size, i) => {
              console.log('❄', this.state.sizes);
              return (
                <button
                  className={styles.sizeToggleButton}
                  key={i}
                  onClick={this.handleClick}
                >
                  {size[1]}
                </button>
              );
            })
          }

          <ul className={styles.offers}>

            {
              Object.entries(this.state.offers).map((obj, i) => {
              const offer = obj[1];

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
              );
            })}
          </ul>
        </main>
      </React.Fragment>
    );
  }
}

export default Dealfinder;
