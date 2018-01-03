import React, { Component } from 'react';

export default class InfoPage extends Component {
  componentWillMount(){
    console.log('WE Will Mount');
  }
  render() {
    return (
      <div>
        <h1>WELCOME</h1>
        <h3>Information about the product</h3>
      </div>
    );
  }
}
