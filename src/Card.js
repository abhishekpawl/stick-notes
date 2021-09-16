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

    </React.Fragment>
  )
}

export default Card;