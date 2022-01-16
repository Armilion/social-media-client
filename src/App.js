import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// Components
import NavBar from "./components/navbar";
import AuthRoute from "./util/AuthRoute";
// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions" 

const theme = createMuiTheme({
  palette:{
    light:"#33c9dc",
    main:"#00bcd4",
    dark:"#008394",
    contrastText:"#fff"

  },
  secondary:{
    light:"#ff6333",
    main:"#ff3d00",
    dark:"#b22a00",
    contrastText:"#fff"
  },
  typography:{
    userNextVariants:true
  }
});

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){ // check if token has expired or not
    store.dispatch(logoutUser());
    window.location.href='/login';
  }else
    store.dispatch({type : SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token; // need to put it because it gets reseted on refresh
    store.dispatch(getUserData());
}

class App extends Component{

  render(){
      return(
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
              <Router>
              <NavBar/>
                <div className="container">
                  <Switch>
                    <Route exact path="/" component={home}/>
                    <AuthRoute exact path="/login" component={login} />
                    <AuthRoute exact path="/signup" component={signup} />
                    <Route exact path="/user/:handle" component={user} />
                    <Route exact path="/user/:handle/scream/:screamId" component={user} />
                  </Switch>
                </div>
              </Router>
          </MuiThemeProvider>
        </Provider>
    );
  }
}

export default App;
