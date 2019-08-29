import React from 'react';

import './Toolbar.css';

const toolbar = (props) => {
  const navItem = !props.toolbar.title ?
    <nav onClick={props.detailHandler}>
      <img src="/images/pikachu.png" className="toolbar__icon toolbar__icon--rounded" alt="My Pokemon" title="My Pokemon" />
      <div className="toolbar__badge" title={`Total owned: ${props.total ? props.total : 0}`}>
        <span className="toolbar__badge--info">{props.total ? props.total : 0}</span>
      </div>
    </nav> : null
  return (
    <header className="toolbar">
      <div className="logo">
        <img src={props.toolbar.srcLogo} alt="Pokemon Logo" onClick={props.backHandler} />
        <span className="toolbar__title">{props.toolbar.title}</span>
      </div>
      {navItem}
    </header>
  );
}

export default toolbar;