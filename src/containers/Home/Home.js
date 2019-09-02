import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actionTypes from '../../store/actions';
import Cards from '../../components/Cards/Cards';
import Loadmore from '../../components/Loadmore/Loadmore';

class Home extends Component {
  state = {
    busy: true,
    loadmore: false,
    nextUrl: ''
  }

  fetchPokemonList(url, firstLoad) {
    this.setLoading(firstLoad, true);
    axios.get(url)
      .then(res => {
        this.setLoading(firstLoad, false);
        this.setState({
          nextUrl: res.data.next ? res.data.next : null
        });
        this.props.onGetPokemon(res.data.results);
      })
      .catch(() => {
        this.setLoading(firstLoad, false);
      });
  }

  setLoading(firstLoad, value) {
    if (firstLoad) {
      this.setState({ busy: value });
    } else {
      this.setState({ loadmore: value });
    }
  }

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
      this.fetchPokemonList('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25', true);
    }
  }

  componentWillUnmount() {
    this.props.onResetPokemon();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.pokemonList !== this.props.pokemonList ||
      nextState.loadmore !== this.state.loadmore
  }

  render() {
    return (
      <div className="content">
        <div className="content__header">
          <h1>Pokemon List</h1>
        </div>
        <Cards isLoading={this.state.busy} isRemove={false} items={this.props.pokemonList} clicked>
          {this.state.nextUrl ? <Loadmore
            nextUrl={this.state.nextUrl}
            isLoading={this.state.loadmore}
            loadmore={() => this.fetchPokemonList(this.state.nextUrl, false)}
          /> : null}
        </Cards>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    toolbar: state.toolbar,
    pokemonList: state.pokemonList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateToolbar: (config) => dispatch({ type: actionTypes.UPDATE_TOOLBAR, toolbar: config }),
    onGetPokemon: (data) => dispatch({ type: actionTypes.GET_POKEMON, pokemonList: data }),
    onResetPokemon: () => dispatch({ type: actionTypes.RESET_POKEMON })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);