import React, { useState, useEffect } from 'react';
import axios from 'axios';

import sad from '../sad.gif';
import loadingImg from '../loading.gif';
import '../App.css';



function SearchQuote() {
  const [isLoading, setLoading] = useState(true)
  const [quotes, setQuote] = useState([])
  const [query, setQuery] = useState('')

  const fetchData = url => {
    setLoading(true)
    axios.get(url)
      .then(res => {
        setQuote(res.data.results)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (!query.length) {
      fetchData('https://quote-garden.herokuapp.com/quotes/all')
    }
  }, [query])

  const updateQuery = e => setQuery(e.target.value)

  const submitHandeler = (event) => {
    event.preventDefault();
    if (query.length) {
      fetchData('https://quote-garden.herokuapp.com/quotes/search/' + query)
    }
  }

  const loading = () => {
    if (isLoading) {
      return <img src={loadingImg} alt="" />
    } else if (!isLoading && quotes.length === 0) {
      return (
        <div className="text-center">
          <img src={sad} alt="" />
          <h1>Result not found</h1>
        </div>
      )
    }
  }


  return (
    <div className="container">
      <div className="search-form">
        <form onSubmit={submitHandeler}>
          <input type="text" placeholder="Enter your keyword" onChange={updateQuery} />
          <button>Submit</button>
        </form>
      </div>
      <div className="quotes">
        {loading()}
        {!isLoading && quotes.map(singleQuote => {
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