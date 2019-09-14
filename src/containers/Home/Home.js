import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Cards from '../../components/Cards/Cards';
import Loadmore from '../../components/Loadmore/Loadmore';

class Home extends Component {
  componentDidMount() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 80);
    this.props.onUpdateToolbar({
      srcLogo: '/images/pokemon.png',
      altLogo: 'Pokemon Logo',
      title: ''
    })
    if (this.props.pokemonList.length === 0) {
      this.props.onGetPokemon('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25', true);
    }
  }

  componentWillUnmount() {
    this.props.onResetPokemon();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.pokemonList !== this.props.pokemonList ||
      nextProps.loadmore !== this.props.loadmore
  }

  render() {
    return (
      <div className="content">
        <div className="content__header">
          <h1>Pokemon List</h1>
        </div>
        <Cards isLoading={this.props.busy} isRemove={false} items={this.props.pokemonList} clicked>
          {this.props.nextUrl ? <Loadmore
            nextUrl={this.props.nextUrl}
            isLoading={this.props.loadmore}
            loadmore={() => this.props.onGetPokemon(this.props.nextUrl, false)}
          /> : null}
        </Cards>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    toolbar: state.toolbar,
    pokemonList: state.pokemon.pokemonList,
    busy: state.pokemon.busy,
    loadmore: state.pokemon.loadmore,
    nextUrl: state.pokemon.nextUrl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateToolbar: (config) => dispatch(actions.updateToolbar(config)),
    onGetPokemon: (url, firstLoad) => dispatch(actions.getPokemon(url, firstLoad)),
    onResetPokemon: () => dispatch(actions.resetPokemon())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);