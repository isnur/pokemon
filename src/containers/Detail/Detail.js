import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './Detail.css';
import * as actionTypes from '../../store/actions';
import { getIdFromUrl, capitalizeFirstLetters } from '../../helpers';
import Spinner from '../../components/Spinner/Spinner';
import Cards from '../../components/Cards/Cards';

class Detail extends Component {
  state = {
    loading: true,
    errorMsg: '',
    pokemonId: getIdFromUrl(this.props.location.pathname),
    pokemonDetail: null,
    myPokemon: null
  }
  goto = (pathname) => {
    this.props.history.push(pathname);
  }
  catchPokemon = () => {
    const beCaught = this.successProbability(0.5);
    if (beCaught) {
      this.props.onCatchPokemon(this.state.myPokemon);
      alert('Catch pokemon success');
      this.goto('/my-pokemon');
    } else {
      alert('Catch pokemon failed');
    }
  }
  successProbability = (p) => {
    return Math.random() > p;
  }
  getMoves() {
    let moves = [];
    this.state.pokemonDetail.moves.forEach((value, key) => {
      if (key < 5) {
        moves.push({
          name: value.move.name,
          url: value.move.url
        });
      }
    });
    return moves;
  }
  getTypes() {
    let types = [];
    this.state.pokemonDetail.types.forEach((value, key) => {
      if (key < 5) {
        types.push({
          name: value.type.name,
          url: value.type.url
        });
      }
    });
    return types;
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.onUpdateToolbar({
      srcLogo: '/images/back.png',
      altLogo: 'Back',
      title: 'Pokemon Detail'
    })
    const url = `https://pokeapi.co/api/v2/pokemon/${this.state.pokemonId}/`;
    axios.get(url)
      .then(res => {
        setTimeout(() => {
          this.setState({
            loading: false,
            pokemonDetail: res.data,
            myPokemon: {
              id: this.state.pokemonId,
              url: url,
              name: res.data.name,
              nickname: ''
            }
          })
        }, 350);
      })
      .catch(err => {
        this.setState({ loading: false, errorMsg: 'Resource not found' });
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.pokemonDetail !== this.state.pokemonDetail || nextState.loading !== this.state.loading
  }

  render() {
    return (
      <div className={`content${this.state.loading ? ' content__loading' : ''}`}>
        <div className="content__header">
          <h1>{this.state.pokemonDetail ? capitalizeFirstLetters(this.state.pokemonDetail.name) : ''}</h1>
        </div>
        <div className="cards">
          {this.state.loading ? <Spinner radius="10" strokeWidth="1" color="#03ac0e" /> :
            <>{this.state.errorMsg ? this.state.errorMsg :
              <>
                <div className="content__catch">
                  <img className="content__image" src={this.state.pokemonDetail.sprites.front_default} alt={this.state.pokemonDetail.name} />
                  {this.props.myPokemon.some(pokemon => pokemon.id === this.state.pokemonId) ?  null :
                    <button className="content__button" onClick={() => { this.catchPokemon() }}>Catch Pokemon</button>}
                </div>
                <div className="content__moves">
                  <h3>Moves:</h3>
                  <Cards pokemonList={this.getMoves()} disableClick />
                </div>
                <div className="content__types">
                  <h3>Types:</h3>
                  <Cards pokemonList={this.getTypes()} disableClick />
                </div>
              </>
            }</>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    myPokemon: state.myPokemon
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateToolbar: (config) => dispatch({ type: actionTypes.UPDATE_TOOLBAR, toolbar: config }),
    onCatchPokemon: (myPokemon) => dispatch({ type: actionTypes.ADD_MY_POKEMON, myPokemon: [myPokemon] })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));