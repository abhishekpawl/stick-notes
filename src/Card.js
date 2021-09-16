import React, {useState, useReducer} from 'react';
import {FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight} from "react-icons/fa";
import Modal from './Modal';

const reducer = (state, action) => {
  if(action.type === 'ADD_ITEM') {

    const newCards = [...state.cards, action.payload];
    return {...state, cards: newCards};

  }
  if(action.type === 'EMPTY') {

    return {...state, showModal: true, modalContent: 'All fields are required'};

  }
  if(action.type === 'CLOSE_MODAL') {

    return {...state, showModal: false};

  }
  if(action.type === 'CLEAR_ALL') {

    return {...state, cards: []};

  }

  throw new Error('no matchin type');
}

const defaultState = {
  cards: [],
  showModal: false,
  modalContent: ''
}

const Card = () => {
  const [dateInfo, setDateInfo] = useState('');
  const [note, setNote] = useState('');

  const [state, dispatch] = useReducer(reducer, defaultState);
  const [index, setIndex] = useState(0);

  var dateInfoDisp = '';
  var noteDisp = '';

  if(state.cards.length > 0) {
    const {dateInfo, note} = state.cards[index];
    dateInfoDisp = dateInfo;
    noteDisp = note;
  }

  const dateHandler = (e) => {
    setDateInfo(e.target.value)
  }

  const noteHandler = (e) => {
    setNote(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    
    if(dateInfo && note) {
      const newNote = {
        dateInfo,
        note
      }

      dispatch({type: 'ADD_ITEM', payload: newNote})

      setDateInfo('');
      setNote('');
    } else {
      dispatch({type: 'EMPTY'})
    }

  }

  const closeModal = () => {
    dispatch({type: 'CLOSE_MODAL'})
  }

  const prevClickHandler = () => {
    if(index === 0) {
      setIndex(state.cards.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  const nextClickHandler = () => {
    if(index === state.cards.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  const clearHandler = () => {
    dispatch({type: 'CLEAR_ALL'});
  }

  return (
    <React.Fragment>

      <article  className="card">

        <div className="logo-container">
          <span className="left-quote-icon">
            <FaQuoteLeft />
          </span>
          <span className="right-quote-icon">
            <FaQuoteRight />
          </span>
        </div>

        {state.cards.length ? (
          <div className="ind-card">
            <h4 className="date-tag">
              {dateInfoDisp}
            </h4>
            <h3 className="info" style={{marginTop: '1rem'}}>
              {noteDisp}
            </h3>

            <div className="button-container">
              <button className="prev-btn"
              onClick={prevClickHandler}>
                <FaChevronLeft />
              </button>
              <button className="next-btn"
              onClick={nextClickHandler}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        ) : (
          <div className="ind-card">
            <h4 style={{marginTop: '1rem', marginBottom: '1rem'}}>No cards saved!</h4>
          </div>
        )}

      </article>

      <article className="card">

        <form className="form">

          {
            state.showModal &&
            <Modal modalContent={state.modalContent} closeModal={closeModal} />
          }
          
          <div>
            <label htmlFor="date">Date: </label>
            <input type="date" id="date" name="date"
            value={dateInfo}
            onChange={dateHandler}></input>
          </div>
          <div>
            <label htmlFor="note">Note:</label>
            <input type="note" id="note" name="note"
            value={note}
            onChange={noteHandler}></input>
          </div>
          <div>
            <button className="btn"
            onClick={submitHandler}>Add note</button>
          </div>
          <div>
            <button className="btn"
            onClick={clearHandler}>Clear all</button>
          </div>

        </form>

      </article>

    </React.Fragment>
  )
}

export default Card;