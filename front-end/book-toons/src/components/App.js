import React from 'react';
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
          <Route exact path = "/hackbeanpot2021" component={Home}/>
          <Route exact path = "/hackbeanpot2021/book-results" component={BookResults}/>
          <Route exact path = "/hackbeanpot2021/artists" component={Artists}/>
          <Route exact path = "/hackbeanpot2021/playlist" component={Playlist}/>
        </Switch>
      </div>
    </Router>
    </>
  );
}

export default App;
