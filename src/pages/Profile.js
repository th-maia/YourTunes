import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: 'Carregando...',
    };
  }

  async componentDidMount() {
    const userFetch = await getUser();
    this.setState({ user: userFetch });
    console.log(userFetch);
  }

  render() {
    const { user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <p>Profile</p>
        <img data-testid="profile-image" alt={ user.name } src={ user.image } />
        <br />
        <h3>Nome:</h3>
        <h3>{ user.name }</h3>
        <br />
        <h3>Email:</h3>
        <h3>{ user.email }</h3>
        <br />
        <h3>Descrição:</h3>
        <h3>{ user.description }</h3>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
