import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.getMusicAPI = this.getMusicAPI.bind(this);
    this.state = {
      artist: '',
      songs: [],
      collection: '',
    };
  }

  async componentDidMount() {
    await this.getMusicAPI();
    await getFavoriteSongs(); // vem um array de objeto com as musicas adicionadas com o addSong
  }

  async getMusicAPI() {
    const { match } = this.props;
    const album = await getMusics(match.params.id); // fetch traz todas as musicas do album
    // console.log(album);
    const { artistName, collectionName } = album[0];
    const [, ...songs] = album; // as caracteristicas da capa do CD ficam no indice 0 então pulamos ele com a virgula(,) para só ficar com as musicas
    this.setState({
      artist: artistName,
      collection: collectionName,
      songs,
    });
  }

  render() {
    const { artist, collection, songs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
        <h3 data-testid="album-name">
          {collection}
        </h3>
        <h4 data-testid="artist-name">
          {artist}
        </h4>
        <div>
          { songs.map((song, index) => (
            <MusicCard
              songName={ song.trackName }
              songPreview={ song.previewUrl }
              key={ song.trackId }
              trackId={ song.trackId }
              albumId={ song.collectionId }
              trackNumber={ index + 1 }
            />))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
