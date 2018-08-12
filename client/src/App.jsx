import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
import algSearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits,
  Highlight } from 'react-instantsearch-dom';

const spotifyApi = new SpotifyWebApi();
const searchClient = algSearch('GDI1NF7NFT', '29ce5e7d8419d80e9422e65e61e05a5a');
const NOT_PLAYING = { name: 'No Song is Playing', albumArt: '' };
const NOW_PLAYING_ERR = 'No active device found. Play music on Spotify desktop or mobile to enable this feature.'

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.token = params.access_token;
    if (this.token) {
      spotifyApi.setAccessToken(this.token);
    }
    this.state = {
      loggedIn: this.token ? true : false,
      nowPlaying: NOT_PLAYING
    }

    setInterval(() => { this.getNowPlaying() }, 1000);
    this.getUserInfo();
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getPlaylistTracks() {
    spotifyApi.getPlaylistTracks(this.state.userInfo.id,
      '3qjcdZmFnyncHXAq2yCloN?si=kRZpdx16QJiL4af5sLzQfg').then((response) => {
        console.log(response);
      })
  }

  getUserInfo = () => {

    spotifyApi.getMyDevices().then((response) => {
      console.log(response);
    });

    fetch('https://api.spotify.com/v1/me', { 
      method: 'get', 
      headers: new Headers({
       'Authorization': 'Bearer ' + this.token, 
       'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).then((response) => {
      response.json().then((responseData) => {
        this.setState({
          userInfo: responseData
        }, () => {
          setTimeout(this.getNowPlaying, 500);
        })
      })
    })
  }

  getUserPlaylists = () => {
    spotifyApi.getPlaylist(this.state.userInfo.id, '3qjcdZmFnyncHXAq2yCloN?si=kRZpdx16QJiL4af5sLzQfg').then((response) => {
    })
  }
 
  getNowPlaying = () => {
    spotifyApi.getMyCurrentPlayingTrack()
      .then((response) => {
        let obj = {};

        if(response.is_playing) {
          obj = { 
            name: response.item.name, 
            albumArt: response.item.album.images[0].url
          }
        } else {
          obj = NOT_PLAYING
        }

        this.setState({
          nowPlaying: obj
        });
      })
  }

  displayTitle = () => {
    if(this.state.userInfo) {
      let imagePath = this.state.userInfo.images ? 
        this.state.userInfo.images[0].url : null;
      return <div className="page-title">
        <div className="image-cropper">
          <img className="profile-photo" src={imagePath} /></div>
        <div>Hello, { this.state.userInfo.display_name }</div>
      </div>
    }
  }

  playTrack = (uri) => {

    let obj = {};
    obj.uris = [uri];

    fetch('https://api.spotify.com/v1/me/player/play', { 
      method: 'put', 
      headers: new Headers({
       'Authorization': 'Bearer ' + this.token, 
       'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: JSON.stringify(obj)
    }).then((response) => {
      if(response.ok) {
        setTimeout(this.getNowPlaying, 500);
      } else {
        alert(NOW_PLAYING_ERR);
      }
    })
  }

  Hit = (props) => {
    return (
      <div className='track'>
        <img style={{width: 100, height: 100}}
          src={props.hit.track.album.images[0].url}
          align="left" 
          alt={props.hit.track.name} />
        <div className="song-content">
          <div className="song-title">
            <div className="hit-name">
              <Highlight attribute="track.artists[0].name" hit={props.hit} /> - 
            </div>
            <div className="song-name">
              <Highlight attribute="track.name" hit={props.hit} />
            </div>
          </div>
          <button
            className="play-button"
            onClick={() => { this.playTrack(props.hit.track.uri)}}>Play</button> 
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <a className="login-button" href='http://localhost:8888'> Login to Spotify </a>
        { this.displayTitle() }
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        <h3>{this.state.user}</h3>
         <InstantSearch
            indexName="Algolia Favorite Tracks"
            searchClient={searchClient}
          >
            <SearchBox />
            <Hits className="results" hitComponent={ this.Hit} />
          </InstantSearch>
      </div>
    );
  }
}

export default App;
