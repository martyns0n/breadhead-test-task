/* eslint-disable */

import React from 'react';
import axios from 'axios'
import Link from 'redux-first-router-link';
import { forEach } from 'async';


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      offers: {
        offer1: {},
        offer2: {}
      }
    }
  }

  componentDidMount() {
    const component = this;

    axios.get('http://localhost:8080')
    .then( (response) => {
      component.setState({
        offers: response.data
      });
      // console.log('⭐', this.state.offers);
    })
    .catch(console.log);
    // this.state.offers.map((element) => {
    //   console.log(element)
    // });
  }

  componentWillUpdate() {

  }
  
  render() {
    return (
      <div className="offers">
        <div className="name">
          { this.state.offers.offer1.id || '' }
        </div>
        <div className="old-price"> 
        { this.state.offers.offer1.name || '' }
        </div>
        <div className="new-price">
        { this.state.offers.offer1.oldPrice || '' }
        </div>
        <div className="sizes">
        { this.state.offers.offer1.newPrice || '' }
        </div>
      </div>
    )
  }
}

export default Home;
