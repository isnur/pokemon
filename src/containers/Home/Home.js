import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './Home.css';
import * as actionTypes from '../../store/actions';
import Cards from '../../components/Cards/Cards';

class Home extends Component {
    state = {
        loading: true,
        previousUrl: '',
        nextUrl: ''
    }

    fetchPokemonList(url) {
        this.setState({loading: true});
        axios.get(url)
            .then(res => {
                this.setState({
                    loading: false,
                    nextUrl: res.data.next ? res.data.next : null,
                    previousUrl: res.data.previousParam ? res.data.previousParam : null
                });
                this.props.onGetPokemon(res.data.results);
            })
            .catch(() => {
                this.setState({loading: false});
            });
    }
    componentDidMount() {
        this.props.onUpdateToolbar({
            srcLogo: '/images/pokemon.png',
            altLogo: 'Pokemon Logo',
            heightLogo: 42,
            title: ''
        })
        if (this.props.pokemonList.length === 0) {
            this.fetchPokemonList('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12');
        }
    }

    componentWillUnmount () {
        this.props.onResetPokemon();
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.pokemonList !== this.props.pokemonList
    }

    render() {
        return (
            <div className="content">
                <div className="content__header">
                    <h1>Pokemon List</h1>
                </div>
                <Cards isLoading={this.state.loading} isRemove={false} pokemonList={this.props.pokemonList} loadmore={() => this.fetchPokemonList(this.state.nextUrl)} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.counter,
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