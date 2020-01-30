import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

// import Header from './components/Header'
import Routes from './routes'
function App() {
	
  return (
	  <CookiesProvider>
      <BrowserRouter>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <Routes/>

      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
