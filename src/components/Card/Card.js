import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import './Card.css';
import { capitalizeFirstLetters } from '../../helpers';

const areEqual = (prevProps, nextProps) => {
  return prevProps.name === nextProps.name;
};

const card = (props) => {
  const removeButton = props.removed ?
    <div className="card__content card__content--delete" onClick={props.removed} title="Release Pokemon">
      <img src="/images/pokeball.svg" className="card__image" alt="Release" />
      <span>Release</span>
    </div> : null;
  const cardContent = !props.clicked ?
    <div className="card__content">
      <div className="card__content--description">
        {capitalizeFirstLetters(props.name)}
      </div>
    </div> :
    <Link className={`card__content${props.removed ? ' card__content--link-remove' : ' card__content--link'}`}
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

export default memo(card, areEqual);