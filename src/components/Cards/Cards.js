import React from 'react';

import './Cards.css';
import Card from '../Card/Card';
import { getIdFromUrl } from '../../helpers';
import Spinner from '../Spinner/Spinner';

const cards = (props) => {
    let pokemonList = props.pokemonList.map(pokemon =>
        <Card key={getIdFromUrl(pokemon.url)}
            id={getIdFromUrl(pokemon.url)}
            isRemove={props.isRemove}
            name={pokemon.name}
            clicked={() => props.clicked(getIdFromUrl(pokemon.url))} />);
    if (props.isLoading) {
        pokemonList = <Spinner radius="5" strokeWidth="1" color="#03ac0e" />;
    }
    if (!props.isLoading && pokemonList.length === 0) {
        pokemonList = <p>No data</p>;
    }
    const loadmore = props.loadmore ?
        <button className="card" onClick={props.loadmore}>
            <span className="card__content">Load more</span>
        </button> : null;
    return (
        <div className="Cards">
            {pokemonList}
            {loadmore}
        </div>
    );
};

export default cards;