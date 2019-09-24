import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Detail.css';
import { getIdFromUrl, capitalizeFirstLetters, successProbability, convertUnits } from '../../helpers';
import Spinner from '../../components/Spinner/Spinner';
import Cards from '../../components/Cards/Cards';
import { mapDispatchToProps } from './actionCreators';
import { mapStateToProps } from './selectors';

export class Detail extends Component {
  goto = (pathname) => {
    this.props.history.push(pathname);
  }
  catchPokemon = () => {
    const beCaught = successProbability(0.5);
    this.openModal(beCaught);
  }
  getMoves() {
    let moves = [];
    this.props.pokemonDetail.moves.forEach((value, key) => {
      moves.push({
        name: value.move.name,
        url: value.move.url
      });
    });
    return moves;
  }
  getTypes() {
    let types = [];
    this.props.pokemonDetail.types.forEach((value, key) => {
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
    const modal = {
      status: true,
      content: success,
      action: {
        cancel: this.closeModal,
        submit: success ? this.saveNickname : null
      },
      clickToClose: !success,
      errorMsg: error ? error : ''
    };
    this.props.onUpdateModal(modal);
  }
  closeModal = () => {
    document.body.style.overflow = "auto";
    document.body.style.position = "unset";
    const modal = {
      status: false
    };
    this.props.onUpdateModal(modal);
  }
  saveNickname = (nickname) => {
    if (!nickname) {
      this.openModal(true, 'Nickname is required');
    } else {
      let pokemon = { ...this.props.selectedPokemon };
      pokemon.nickname = nickname;
      this.props.onCatchPokemon(pokemon);
      this.closeModal();
      this.goto('/my-pokemon');
    }
  }
  getNickname() {
    if (this.props.myPokemon) {
      const pokemon = this.props.myPokemon.filter(pokemon => pokemon.id === this.props.selectedPokemon.id);
      return pokemon.length > 0 ? pokemon[0].nickname : '';
    }
    return '';
  }
  getImage() {
    if (this.props.pokemonDetail && this.props.pokemonDetail.sprites) {
      return this.props.pokemonDetail.sprites.front_default
    }
    return '';
  }
  componentDidMount() {
    this.props.onUpdateToolbar({
      srcLogo: '/images/back.png',
      altLogo: 'Back',
      title: 'Pokemon Detail'
    });
    const id = getIdFromUrl(this.props.location.pathname);
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    this.props.onGetPokemonDetail(url, id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.pokemonDetail !== this.props.pokemonDetail ||
    nextProps.loading !== this.props.loading;
  }

  render() {
    return (
      <div className={`content${this.props.loading ? ' content__loading' : ''}`}>
        {this.props.loading && <Spinner radius="10" strokeWidth="1" color="#03ac0e" />}
        {!this.props.loading && !this.props.pokemonDetail && this.props.errorMsg && <div style={{ marginTop: '30px' }}>{this.props.errorMsg}</div>}
        {!this.props.loading && this.props.pokemonDetail &&
          <>
            <div className="content__header">
              <h1>
                {this.getNickname() && capitalizeFirstLetters(this.props.pokemonDetail.name)}
                {!this.getNickname() ?
                  capitalizeFirstLetters(this.props.pokemonDetail.name) :
                  <span> ({capitalizeFirstLetters(this.getNickname())})</span>
                }
              </h1>
            </div>
            <div className="content__catch">
              {this.getImage() && <img className="content__image" src={this.getImage()} alt={this.props.pokemonDetail.name} />}
              {this.props.myPokemon && this.props.myPokemon.some(pokemon => pokemon.id === this.props.selectedPokemon.id) ? null :
                <button className="content__button" onClick={this.catchPokemon}>Catch the Pokemon</button>}
            </div>
            <div className="content__info">
              <div className="info__weight">
                <div className="title">{convertUnits(this.props.pokemonDetail.weight)}kg</div>
                <div className="subtitle">WEIGHT</div>
              </div>
              <div className="info__height">
                <div className="title">{convertUnits(this.props.pokemonDetail.height)}m</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));