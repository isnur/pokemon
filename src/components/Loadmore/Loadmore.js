import React, { memo } from 'react';

import './Loadmore.css';
import Spinner from '../Spinner/Spinner';

function areEqual(prevProps, nextProps) {
  return prevProps.isLoading === nextProps.isLoading;
}
const loadmore = (props) => {
  return (<button className="card" onClick={props.loadmore} disabled={props.isLoading}>
    <span className="card__content card__content--loadmore">
      Load more{props.isLoading ? <>&nbsp;<Spinner radius="30" width="16px" height="16px" strokeWidth="5" color="#03ac0e" /></> : null}
    </span>
  </button>);
}

export default memo(loadmore, areEqual);