import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const [quote, setQuote] = useState({
    author: '',
    text: '',
    bgColor: '',
    length: 0,
    quoteArray: [{}],
  });
  
  
  useEffect(()=>{
   console.log('useEffect');
    const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'            
  fetch(url, {
      headers: {
        Accept: "application/json",
      }
    })
    .then(response => response.json())
    .then((responseData) => {
      console.log("responseData",responseData);
      setQuote({
        ...quote,
        author: responseData.quotes[0].author,
        text: responseData.quotes[0].quote,
        bgColor: '#16a085',
        length: responseData.quotes.length,
        quoteArray: responseData.quotes,
      });
    })
  },[]);
  
  
  const generateQuote = ()=>{
    let randomNumber = Math.floor((Math.random()*quote.length));
    let randomQuote =  [];
    
   randomQuote = quote.quoteArray.filter((item, index)=>{
      return index === randomNumber;
   })

    
    const colorArray =[
      '#16a085',
      '#27ae60',
      '#2c3e50',
      '#f39c12',
      '#e74c3c',
      '#9b59b6',
      '#FB6964',
      '#342224',
      '#472E32',
      '#BDBB99',
      '#77B1A9',
      '#73A857'
    ]
    
    var colorIndex = Math.floor(Math.random()*colorArray.length);
    console.log("color quote",quote);
   setQuote({
        ...quote,
        author: randomQuote[0].author,
        text: randomQuote[0].quote,
        bgColor: colorArray[colorIndex],
      });

  }
  
  const bgStyle = {
      backgroundColor: quote.bgColor,
    };
  
  const fontstyle = {
      color: quote.bgColor,
  }
  
  
  const handleClick = ()=>{
    generateQuote();
    console.log("quote",quote)
  }
  
    return (
      <div className="wrapper" style={bgStyle}>
        <div id="quote-box">
          <div id="quote-text" style={fontstyle}>
            <p id="text">{quote.text}</p>
            <p id="author">-{quote.author}</p>
          </div>
          
          <div id="quote-button">
            <a id="tweet-quote" 
              href="https://twitter.com/intent/tweet"
                      target="_blank"
              style={fontstyle}>Twitter</a>
            <button id="new-quote" 
                    style={bgStyle}
                    onClick={handleClick}>Newquote</button>
            
          </div>
        </div>
      </div>  
    );
}

export default App;
