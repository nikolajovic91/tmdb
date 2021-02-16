import Layout from "./components/Layout";
import { Switch, Route } from "react-router-dom";

import Movies from "./components/Movies";
import Shows from "./components/Shows";
import Persons from "./components/Persons";
import MovieDetails from "./components/MovieDetails";
import PersonDetail from "./components/PersonDetail";
import ShowDetail from "./components/ShowDetail";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Layout />
      <Switch>
      <Route exact path="/person/:id/:name">
          <PersonDetail />
        </Route>
        <Route exact path="/persons">
          <Persons />
        </Route>
      <Route exact path="/movies/:id">
          <MovieDetails />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route exact path="/shows/:id">
          <ShowDetail />
        </Route>
        <Route path="/shows">
          <Shows />
        </Route>
        <Route path="/"  >
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
