import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: 'Carregando...',
    };
  }

  componentDidMount = async () => {
    const userInfo = await getUser();
    this.setState({ userName: userInfo.name });
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        Oi, Seja bem vindo!!!
        <h3 data-testid="header-user-name">{ userName }</h3>
        <Link to="/search" data-testid="link-to-search"> Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
