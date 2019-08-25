import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import * as actionTypes from '../../store/actions';
import { getIdFromUrl, capitalizeFirstLetters } from '../../helpers';
import Spinner from '../../components/Spinner/Spinner';

class Detail extends Component {
    state = {
        loading: true,
        pokemonId: getIdFromUrl(this.props.location.pathname),
        pokemonDetail: null,
        myPokemon: null
    }
    goto = (pathname) => {
        this.props.history.push(pathname);
    }
    catchPokemon = () => {
        this.props.onCatchPokemon(this.state.myPokemon);
        this.goto('/my-pokemon');
    }
    componentDidMount() {
        this.setState({ loading: true });
        this.props.onUpdateToolbar({
            srcLogo: '/images/back.png',
            altLogo: 'Back',
            heightLogo: 18,
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
                }, 700);
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.pokemonDetail !== this.state.pokemonDetail
    }

    render() {
        let detailPage = null;
        if (this.state.loading) {
            detailPage = <Spinner radius="5" strokeWidth="1" color="#03ac0e" />;
        } else {
            detailPage = <div>
                <button onClick={() => { this.catchPokemon() }}>Catch Pokemon</button>
            </div>;
        }
        return (
            <div className="content">
                <div className="content__header">
                    <h1>{this.state.pokemonDetail ? capitalizeFirstLetters(this.state.pokemonDetail.name) : ''}</h1>
                </div>
                <div className="cards">
                    {detailPage}
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