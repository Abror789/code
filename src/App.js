import React, {useContext} from 'react';
import Auth from "./Components/Auth";
import {Switch, Route, Link, Redirect} from "react-router-dom";
import Home from "./Components/Home";
import Token from "./Token";
import Company from "./Components/Home/Company";
import SearchMain from "./Components/Home/Search";



const App = () => {
  return (
      <>
        <Switch>
          {!Token && <Route path="/login"  component={Auth}/>}
            <Route path="/company/:id"  component={Company}/>
            <Route path="/search"  component={SearchMain}/>
            {Token &&<Route path="/"  component={Home}/>}
            {Token?<Redirect to="/"/>:<Redirect to="/login"/>}
        </Switch>

      </>
  );
};

export default App;
