import React, { Component } from 'react';
import { connect } from 'react-redux';

import './MyPokemon.css';
import * as actionTypes from '../../store/actions';
import Cards from '../../components/Cards/Cards';

class MyPokemon extends Component {
    componentDidMount() {
        this.props.onUpdateToolbar({
            srcLogo: '/images/back.png',
            altLogo: 'Back',
            heightLogo: 18,
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
                <Cards isRemove={true} pokemonList={this.props.myPokemon} loadmore={false} clicked={(id) => this.props.onRemove(id)} />
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
        onUpdateToolbar: (config) => dispatch({ type: actionTypes.UPDATE_TOOLBAR, toolbar: config }),
        onRemove: (id) => dispatch({ type: actionTypes.DELETE_MY_POKEMON, id: id }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyPokemon);