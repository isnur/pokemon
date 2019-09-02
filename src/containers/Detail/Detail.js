import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './Detail.css';
import * as actionTypes from '../../store/actions';
import { getIdFromUrl, capitalizeFirstLetters, successProbability, convertUnits } from '../../helpers';
import Spinner from '../../components/Spinner/Spinner';
import Cards from '../../components/Cards/Cards';

class Detail extends Component {
  state = {
    loading: true,
    errorMsg: '',
    pokemonId: getIdFromUrl(this.props.location.pathname),
    pokemonDetail: null,
    myPokemon: null,
    showModal: false
  }
  goto = (pathname) => {
    this.props.history.push(pathname);
  }
  catchPokemon = () => {
    const beCaught = successProbability(50);
    if (beCaught) {
      this.openModal(true);
    } else {
      this.openModal(false);
    }
  }
  getMoves() {
    let moves = [];
    this.state.pokemonDetail.moves.forEach((value, key) => {
      moves.push({
        name: value.move.name,
        url: value.move.url
      });
    });
    return moves;
  }
  getTypes() {
    let types = [];
    this.state.pokemonDetail.types.forEach((value, key) => {
      types.push({
        name: value.type.name,
        url: value.type.url
      });
    });
    return types;
  }
  openModal(success, error) {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    // document.body.style.paddingTop = "38px";
    const modal = {
      status: true,
      content: success,
      action: {
        cancel: () => this.closeModal(),
        submit: success ? (e) => this.saveNickname(e) : null
      },
      clickToClose: !success,
      errorMsg: error ? error : ''
    };
    this.props.onUpdateModal(modal);
  }
  closeModal() {
    document.body.style.overflow = "auto";
    document.body.style.position = "unset";
    // document.body.style.paddingTop = 0;
    const modal = {
      status: false
    };
    this.props.onUpdateModal(modal);
  }
  saveNickname(nickname) {
    if (!nickname) {
      this.openModal(true, 'Nickname is required');
    } else {
      let pokemon = { ...this.state.myPokemon };
      pokemon.nickname = nickname;
      this.props.onCatchPokemon(pokemon);
      this.closeModal();
      this.goto('/my-pokemon');
    }
  }
  getNickname() {
    const pokemon = this.props.myPokemon.filter(pokemon => pokemon.id === this.state.pokemonId);
    return pokemon.length > 0 ? pokemon[0].nickname : '';
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.onUpdateToolbar({
      srcLogo: '/images/back.png',
      altLogo: 'Back',
      title: 'Pokemon Detail'
    });
    const url = `https://pokeapi.co/api/v2/pokemon/${this.state.pokemonId}/`;
    axios.get(url)
      .then(res => {
        this.setState({
          loading: false,
          pokemonDetail: res.data,
          myPokemon: {
            id: this.state.pokemonId,
            url: url,
            name: res.data.name
          }
        })
      })
      .catch(err => {
        this.setState({ loading: false, errorMsg: err.response.data });
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.pokemonDetail !== this.state.pokemonDetail ||
      nextState.loading !== this.state.loading || nextState.showModal !== this.state.showModal;
  }

  render() {
    return (
      <div className={`content${this.state.loading ? ' content__loading' : ''}`}>
        <div className="content__header">
          <h1 style={{ 'display': this.state.loading ? 'none' : 'block' }}>
            {this.getNickname() && this.state.pokemonDetail ?
              capitalizeFirstLetters(this.state.pokemonDetail.name) :
              capitalizeFirstLetters(this.getNickname())
            }
            {!this.getNickname() && this.state.pokemonDetail ?
              capitalizeFirstLetters(this.state.pokemonDetail.name) :
              <span> ({capitalizeFirstLetters(this.getNickname())})</span>
            }
          </h1>
        </div>
        {this.state.loading && <Spinner radius="10" strokeWidth="1" color="#03ac0e" />}
        {this.state.errorMsg && <div style={{ marginTop: '30px' }}>{this.state.errorMsg}</div>}
        {!this.state.loading && !this.state.errorMsg &&
          <>
            <div className="content__catch">
              <img className="content__image" src={this.state.pokemonDetail.sprites.front_default} alt={this.state.pokemonDetail.name} />
              {this.props.myPokemon.some(pokemon => pokemon.id === this.state.pokemonId) ? null :
                <button className="content__button" onClick={() => { this.catchPokemon() }}>Catch the Pokemon</button>}
            </div>
            <div className="content__info">
              <div className="info__weight">
                <div className="title">{convertUnits(this.state.pokemonDetail.weight)}kg</div>
                <div className="subtitle">WEIGHT</div>
              </div>
              <div className="info__height">
                <div className="title">{convertUnits(this.state.pokemonDetail.height)}m</div>
                <div className="subtitle">HEIGHT</div>
              </div>
            </div>
            <div className="content__moves">
              <h3>Moves:</h3>
              <Cards items={this.getMoves()} />
            </div>
            <div className="content__types">
              <h3>Types:</h3>
              <Cards items={this.getTypes()} />
            </div>
          </>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    myPokemon: state.myPokemon,
    modal: state.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateToolbar: (config) => dispatch({ type: actionTypes.UPDATE_TOOLBAR, toolbar: config }),
    onCatchPokemon: (myPokemon) => dispatch({ type: actionTypes.ADD_MY_POKEMON, myPokemon: [myPokemon] }),
    onUpdateModal: (modal) => dispatch({ type: actionTypes.UPDATE_MODAL, modal: modal })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));