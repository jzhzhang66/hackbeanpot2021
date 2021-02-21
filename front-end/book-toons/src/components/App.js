import React from 'react';
import './app.css';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/home';
import BookResults from '../pages/bookresults';
import Artists from '../pages/artists';
import Playlist from '../pages/playlist';

function App() {
  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Book Toons</title>
    </Helmet>
    <Router>
      <div>
        <Switch>
          <Route exact path = "/" component={Home}/>
          <Route exact path = "/book-results" component={BookResults}/>
          <Route exact path = "/artists" component={Artists}/>
          <Route exact path = "/playlist" component={Playlist}/>
        </Switch>
      </div>
    </Router>
    </>
  );
}

export default App;
