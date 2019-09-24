import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cards from '../../components/Cards/Cards';
import { mapDispatchToProps } from './actionCreators';
import { mapStateToProps } from './selectors';

export class MyPokemon extends Component {
  componentDidMount() {
    this.props.onUpdateToolbar({
      srcLogo: '/images/back.png',
      altLogo: 'Back',
      title: 'My Pokemon'
    })
  }

  render() {
    return (
      <div className="content">
        <div className="content__header">
          <h1>My Pokemon List</h1>
          <span>Total owned: <strong>{this.props.myPokemon.length}</strong></span>
        </div>
        <Cards items={this.props.myPokemon} loadmore={false} clicked removed={id => this.props.onRemove(id)} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemon);