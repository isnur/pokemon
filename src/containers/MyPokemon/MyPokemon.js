import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Cards from '../../components/Cards/Cards';

class MyPokemon extends Component {
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
        <Cards items={this.props.myPokemon} loadmore={false} clicked removed={(id) => this.props.onRemove(id)} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    toolbar: state.toolbar,
    myPokemon: state.myPokemon
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateToolbar: (config) => dispatch(actions.updateToolbar(config)),
    onRemove: (id) => dispatch(actions.deleteMyPokemon(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyPokemon);