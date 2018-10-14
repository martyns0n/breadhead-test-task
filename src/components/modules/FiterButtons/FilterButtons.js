import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class FilterButtons extends React.Component {
  render() {
    return (
      <div className={styles.filter}>
        <h2 className={styles.subtitle}>Фильтр размеров</h2>
        {
          this.props.sizes.map(size => (
            <button
              className={styles.toggleSizeButton}
              key={size}
              onClick={(event) => {
                event.currentTarget.classList.toggle(styles.active);
                this.props.toggleFilter(size);
              }}
            >
              {size}
            </button>
          ))
        }
      </div>
    );
  }
}

FilterButtons.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  // filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleFilter: PropTypes.func.isRequired,
};

export default FilterButtons;
