import React, { useState, useEffect } from 'react';
import axios from 'axios';


import '../App.css';



function SearchQuote() {

  const [quotes, setQuote] = useState([])


  axios.get('https://quote-garden.herokuapp.com/quotes/all')
    .then(res => {
      setQuote(res.data.results)
    })
    .catch(err => console.log(err))

  return (
    <div className="container">
      <div className="search-form">
        <form>
          <input type="text" placeholder="Enter your keyword" />
          <button>Submit</button>
        </form>
      </div>
      <div className="quotes">
        {quotes.map(singleQuote => {
          return (
            <div className="quote" key={singleQuote._id}>
              <h3>{singleQuote.quoteText}</h3>
              <p>- {singleQuote.quoteAuthor}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}


export default SearchQuote;