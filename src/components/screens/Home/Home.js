/* eslint-disable */

import React from 'react';
import axios from 'axios'
import Link from 'redux-first-router-link';


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      offer: {}
    }
  }

  componentDidMount() {
    const component = this;

    axios.get('http://localhost:8080')
    .then( (response) => {
      component.setState({
        offers: response.data
      });
      console.log('⭐', this.state.offers);
    })
    .catch(console.log);
  }
  
  render() {
    return (
      <div>
        test test
        {/* {this.state.offers.map((offer) => {
          return (
            <div>offer.id</div>
          )
        })} */}
        {/* {this.state.offers.offer1.id} */}
        {/* <div>
        {this.state.offers.id}
        </div>
        <div>
          {this.state.offers.name}
        </div>
        <div>
          {this.state.offers.oldPrice}
        </div>
        <div>
          {this.state.offers.newPrice}
        </div> */}
      </div>
    )
  }
}

export default Home;
