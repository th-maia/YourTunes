import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Fav from '../components/Fav';

class Favorites extends Component {
  constructor() {
    super();
    this.pageUpdate = this.pageUpdate.bind(this);
    this.state = {
      favoriteSongs: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.pageUpdate();
  }

  async pageUpdate() {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    console.log(favoriteSongs);
    this.setState({
      loading: false,
      favoriteSongs,
    });
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Favorites</p>
        { loading === true
          ? <h3>Carregando...</h3>
          : (favoriteSongs.map((song) => (
            <Fav
              song={ song }
              key={ song.trackId }
              pageUpdate={ this.pageUpdate }
            />)))}
        <div />
      </div>
    );
  }
}
// trabalhando apartir daqui
export default Favorites;
