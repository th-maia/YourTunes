import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.charactersCount = this.charactersCount.bind(this);
    this.onClickPesquisar = this.onClickPesquisar.bind(this);
    this.state = {
      inputValue: '',
      disable: true,
      loading: false,
      // artist: '',
      albums: [],
      artistaPesquisado: '',
    };
  }

  onClickPesquisar() {
    const { inputValue } = this.state;
    this.setState({
      artistaPesquisado: inputValue,
      inputValue: '',
    }, () => {
      this.setState({
        disable: true,
        loading: true,
      }, async () => {
        const { artistaPesquisado } = this.state;
        const artistAlbums = await searchAlbumsAPI(`${artistaPesquisado}`);
        // console.log(artistAlbums);
        this.setState({
          albums: [...artistAlbums],
          loading: false,
          // artist: artistAlbums.artistName,
        });
      });
    });
  }

  charactersCount({ target }) {
    const { value } = target;
    this.setState(
      { inputValue: value }, () => {
        const { inputValue } = this.state;
        if (inputValue.length >= 2) {
          this.setState({ disable: false });
        } else {
          this.setState({ disable: true });
        }
      },
    );
  }

  render() {
    const { inputValue, disable, loading, albums, artistaPesquisado } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        { loading ? <p>Carregando...</p>
          : (
            <div>
              <input
                id="inputValue"
                type="text"
                data-testid="search-artist-input"
                onChange={ this.charactersCount }
                value={ inputValue }
              />
              <input
                type="button"
                value="Pesquisar"
                data-testid="search-artist-button"
                disabled={ disable }
                onClick={ this.onClickPesquisar }
              />
            </div>)}
        <div>
          <h4>
            { `Resultado de álbuns de: ${artistaPesquisado} `}
          </h4>
          { albums.length >= 1
            ? (
              albums.map((album, index) => (
                <div key={ index }>
                  <Link
                    to={ { pathname: `/album/${album.collectionId}`,
                      artistName: `${album.artistName}`,
                      collectionName: `${album.collectionName}`,
                    } }
                    key={ album.collectionId }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    {`${album.collectionName}`}
                  </Link>
                </div>
              )))
            : (
              <p> Nenhum álbum foi encontrado </p>
            )}
        </div>
      </div>
    );
  }
}

export default Search;
