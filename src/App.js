import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// import Header from './components/Header'
import Routes from './routes'
function App() {
	
  return (
	  
    <BrowserRouter>
      {/* <Header/> */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <Routes/>

    </BrowserRouter>
  );
}

export default App;
