import React from 'react';
import { Link } from 'react-router-dom';

import './Card.css';
import { capitalizeFirstLetters } from '../../helpers';

const card = (props) => {
  const removeButton = props.isRemove ?
    <div className="card__content card__content--delete" onClick={props.clicked}>
      <img src="/images/trash.png" className="card__image" alt="trash" title="Remove" />
    </div> : null;
  const cardContent = props.disableClick ?
    <div className="card__content">
      <div className="card__content--description">
        {capitalizeFirstLetters(props.name)}
      </div>
    </div> :
    <Link className="card__content card__content--link"
      to={`/detail/${props.id}`}>
      <div className="card__content--description">
        {capitalizeFirstLetters(props.name)}
      </div>
    </Link>;

  return (
    <div className="card">
      {cardContent}
      {removeButton}
    </div>
  );
};

export default card;