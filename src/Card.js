import React, {useState, useReducer} from 'react';
import {FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight} from "react-icons/fa";

const Card = () => {
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
      </article>

      <article className="card">

        <form className="form">
          
          <div>
            <label htmlFor="date">Date: </label>
            <input type="date" id="date" name="date"></input>
          </div>
          <div>
            <label htmlFor="note">Note:</label>
            <input type="note" id="note" name="note"></input>
          </div>
          <div>
            <button className="btn">Add note</button>
          </div>
          <div>
            <button className="btn">Clear all</button>
          </div>

        </form>

      </article>

    </React.Fragment>
  )
}

export default Card;