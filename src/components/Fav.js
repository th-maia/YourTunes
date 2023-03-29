import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeSong } from '../services/favoriteSongsAPI';

class Fav extends Component {
  constructor() {
    super();
    this.favoritaCheckBoxChange = this.favoritaCheckBoxChange.bind(this);
    this.state = {
      loading: false,
      favoriteSongs: JSON.parse(localStorage.favorite_songs),
      checkBoxChecked: false,
    };
  }

  async componentDidMount() {
    const { song } = this.props;
    const { trackId } = song;
    const { favoriteSongs } = this.state;

    if (favoriteSongs.some((element) => (element.trackId === trackId))) {
      this.setState({ checkBoxChecked: true });
    }
  }

  async favoritaCheckBoxChange({ target }) { // estamos aqui
    const { pageUpdate, song } = this.props;
    console.log(song);
    console.log(target.checked);
    if (target.checked === false) {
      this.setState({ loading: true });
      await removeSong(song);
      pageUpdate();
      this.setState({ loading: false });
    }
  }

  render() {
    const { song } = this.props;
    const { trackName, previewUrl, trackId } = song;
    const { loading, checkBoxChecked } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
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

Fav.propTypes = {
  song: PropTypes.objectOf(PropTypes.object).isRequired,
  pageUpdate: PropTypes.func.isRequired,
};
// trabalhadno apartir daqui.
export default Fav;
