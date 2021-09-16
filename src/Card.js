import React, {useState, useReducer} from 'react';
import {FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight} from "react-icons/fa";
import Modal from './Modal';
import {AiOutlineDelete} from "react-icons/ai";
import {reducer} from './reducer';
import {FiChevronsLeft, FiChevronsRight} from 'react-icons/fi';

const defaultState = {
  cards: [],
  showModal: false,
  modalContent: ''
}

const Card = () => {
  const [dateInfo, setDateInfo] = useState('');
  const [note, setNote] = useState('');
  const [id, setId] = useState('');

  const [state, dispatch] = useReducer(reducer, defaultState);
  const [index, setIndex] = useState(0);

  var idDisp = '';
  var dateInfoDisp = '';
  var noteDisp = '';

  if(state.cards.length > 0) {
    const {id, dateInfo, note} = state.cards[index];
    idDisp = id;
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

      const id = new Date().getTime().toString();

      const newNote = {
        id,
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

  const prevMostHandler = () => {
    setIndex(0);
  }

  const nextMostHandler = () => {
    setIndex(state.cards.length - 1);
  }

  const clearHandler = () => {
    dispatch({type: 'CLEAR_ALL'});
  }

  const deleteHandler = (id) => {
    dispatch({type: 'DELETE_ONE', payload: id});
    setIndex(0);
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
            <h6 style={{marginTop: '1rem', color: 'var(--clr-grey-8)'}}>
              {index + 1}
            </h6>

            <div className="button-container">
              {
                state.cards.length > 2 &&
                <button className="prev-btn"
                onClick={prevMostHandler}>
                  <FiChevronsLeft />
                </button>
              }
              <button className="prev-btn"
              onClick={prevClickHandler}>
                <FaChevronLeft />
              </button>
              <button className="del-btn"
              onClick={() => deleteHandler(idDisp)}>
                <AiOutlineDelete />
              </button>
              <button className="next-btn"
              onClick={nextClickHandler}>
                <FaChevronRight />
              </button>
              {
                state.cards.length > 2 &&
                <button className="next-btn"
                onClick={nextMostHandler}>
                  <FiChevronsRight />
                </button>
              }
            </div>
          </div>
        ) : (
          <div className="ind-card">
            <h4 style={{marginTop: '1rem', marginBottom: '1rem', color: 'var(--clr-grey-6)'}}>
              No cards saved!
            </h4>
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
            <label htmlFor="date"><strong>Date:  </strong></label>
            <input type="date" id="date" name="date"
            value={dateInfo}
            onChange={dateHandler}></input>
          </div>
          <div>
            <label htmlFor="note"><strong>Note</strong></label>
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