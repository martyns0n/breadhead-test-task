import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class DealCards extends React.Component {
  getFilteredDeals() {
    let filteredDeals;
    
    if (!this.props.filters.length) {
      filteredDeals = this.props.deals;
    } else {
      filteredDeals = this.props.deals
        .filter(deal => this.props.filters
          .some(filter => deal.sizes.indexOf(filter) !== -1));
    }

    return filteredDeals.filter(deal => !deal.message.match(/дайджест/i))
  }

  render() {
    return (
      <ul className={styles.deals}>
        {
          this.getFilteredDeals().map(deal => (
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
                {' '}
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
          ))}
      </ul>
    );
  }
}

DealCards.propTypes = {
  deals: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DealCards;
