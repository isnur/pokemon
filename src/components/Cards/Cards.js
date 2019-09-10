import React from 'react';

import './Cards.css';
import Card from '../Card/Card';
import { getIdFromUrl } from '../../helpers';
import Spinner from '../Spinner/Spinner';

const cards = (props) => {
  let cardItems = null;
  if (props.isLoading) {
    cardItems = <Spinner radius="10" strokeWidth="1" color="#03ac0e" />;
  } else {
    if (props.items && props.items.length !== 0) {
      cardItems = props.items.map(pokemon =>
        <Card key={getIdFromUrl(pokemon.url)}
          id={getIdFromUrl(pokemon.url)}
          name={pokemon.nickname ? pokemon.nickname : pokemon.name}
          removed={props.removed ? () => props.removed(getIdFromUrl(pokemon.url)) : null}
          clicked={props.clicked}
        />);
    } else {
      cardItems = <p>No data</p>;
    }
  }
  return (
    <div className="cards">
      {cardItems}
      {props.children}
    </div>
  );
};

export default cards;