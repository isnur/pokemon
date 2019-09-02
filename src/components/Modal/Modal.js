import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ modal }) => {
  const [nickname, setNickname] = useState('');
  if (!modal.status) {
    return null;
  }
  const handleSubmit = e => {
    e.preventDefault();
    modal.action.submit(nickname);
    setNickname('');
  };
  return (
    <div className="modal__container">
      <div className="modal">
        <h2>{modal.content ? 'Successfully caught the Pokemon' : 'Failed to catch the Pokemon'}</h2>
        {modal.content && <div className="content">
          <label>
            <p>Give the Pokemon a nickname</p>
            <input className="modal__input" type="text" name="nickname" onChange={event => setNickname(event.target.value)} />
          </label>
          <p className="modal__error">{modal.errorMsg}</p>
        </div>}
        <div className="actions">
          {modal.content ?
            <button className="toggle__button toggle__button--submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </button> :
            <button className="toggle__button toggle__button--cancel" onClick={modal.action.cancel}>
              Close
            </button>
          }
        </div>
      </div>
      {modal.clickToClose && <div className="modal__outside" onClick={modal.action.cancel}></div>}
    </div>
  );
}

export default Modal;