import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.onChangeToState = this.onChangeToState.bind(this);
    this.buttonCreateUser = this.buttonCreateUser.bind(this);
    this.state = {
      nameInputValue: '',
      buttonDisable: true,
      loading: false,
    };
  }

  onChangeToState({ target }) {
    const { id, value } = target;
    const charactersMin = 3;
    this.setState(
      {
        [id]: value,
      }, () => {
        const { nameInputValue } = this.state;
        if (nameInputValue.length >= charactersMin) {
          this.setState({ buttonDisable: false });
        } else {
          this.setState({ buttonDisable: true });
        }
      },
    );
  }

  async buttonCreateUser() {
    const {
      nameInputValue,
    } = this.state;
    this.setState({ loading: true });
    console.log(nameInputValue);
    await createUser({ name: nameInputValue });
    this.setState({ loading: null });
  }

  render() {
    const { nameInputValue, buttonDisable, loading } = this.state;
    return (
      <div>
        <p>YourTunes</p>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (
                <Login
                  nameInputValue={ nameInputValue }
                  buttonDisable={ buttonDisable }
                  loading={ loading }
                  changeState={ this.onChangeToState }
                  createUser={ this.buttonCreateUser }
                />) }
            />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
