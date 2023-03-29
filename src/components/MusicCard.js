import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.favoritaCheckBoxChange = this.favoritaCheckBoxChange.bind(this);
    this.state = {
      loading: false,
      getMusicObj: { },
      trackNumber: '',
      favoriteSongs: JSON.parse(localStorage.favorite_songs),
      checkBoxChecked: false,
    };
  }

  async componentDidMount() {
    const { albumId, trackNumber, trackId } = this.props;
    const { favoriteSongs } = this.state;
    const album = await getMusics(albumId);
    this.setState({
      getMusicObj: album,
      trackNumber,
    });

    if (favoriteSongs.some((element) => (element.trackId === trackId))) {
      this.setState({ checkBoxChecked: true });
    }
  }

  async favoritaCheckBoxChange({ target }) {
    const { getMusicObj, trackNumber } = this.state;
    console.log(target.checked);

    if (target.checked === true) {
      console.log('marcado');
      await this.setState({ loading: true });
      await addSong(getMusicObj[trackNumber]);
      await this.setState({ loading: false, checkBoxChecked: true });
    } else {
      console.log('desmarcado');
      console.log(getMusicObj);
      console.log(trackNumber);
      await this.setState({ loading: true });
      await removeSong(getMusicObj[trackNumber]);
      await this.setState({ loading: false, checkBoxChecked: false });
    }
  }

  render() {
    const { songName, songPreview, trackId } = this.props;
    const { loading, checkBoxChecked } = this.state;
    return (
      <div>
        <p>{songName}</p>
        <audio data-testid="audio-component" src={ songPreview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        { loading === false
          ? (
            <label htmlFor={ trackId }>
              Favorita
              <input
                type="checkbox"
                name="isChecked"
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.favoritaCheckBoxChange }
                checked={ checkBoxChecked }
              />
            </label>)
          : <span>Carregando...</span>}
      </div>
    );
  }
}

MusicCard.propTypes = {
  songName: PropTypes.string.isRequired,
  songPreview: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  albumId: PropTypes.number.isRequired,
  trackNumber: PropTypes.number.isRequired,
};

export default MusicCard;
