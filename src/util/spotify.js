let stateKey = 'spotify_auth_state';
const client_id = 'b4ddea724f004dd9803b28998ac8738c'; // Your client id
const redirect_uri = 'http://localhost:3000/'; // Your redirect uri
let access_token;
let state;
let expires_in;
const Spotify = {

  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  },

  /**
   * Generates a random string containing numbers and letters
   * @param  {number} length The length of the string
   * @return {string} The generated string
   */
  generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },


  getAccessToken() {


    if (access_token) {
      return access_token;
    }

    let params = this.getHashParams();

    access_token = params.access_token;
    state = params.state;
    expires_in = Number(params.expires_in);

    if (access_token && expires_in) {

      // This clears the parameters, allowing us to grab a new access token when it expires 
      setTimeout(() => {
        access_token = '';
        alert("Token expired");
      }, params.expires_in * 1000)
      //window.alert(`PushState para eliminar el token de la direccion del navegador: ${accessToken}`)
      window.history.pushState('Access Token', null, '/');
      return access_token
    } else {



      state = this.generateRandomString(16);

      localStorage.setItem(stateKey, state);
      let scope = 'playlist-modify-public';

      let url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&scope=' + encodeURIComponent(scope);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      url += '&state=' + encodeURIComponent(state);
      url += '&show_dialog=' + false;


      window.location = url;
    }


  },

  // async syntax
  async search(searchQuery) {
    try {
      if (!searchQuery) {
        return;
      }

      if (!access_token) {
        this.getAccessToken();
      }

      const getRequest = await fetch('https://api.spotify.com/v1/search?q=' + searchQuery + '&type=track',
        {
          headers: { 'Authorization': 'Bearer ' + access_token }
        }
      );

      const getRequestJson = await getRequest.json();
      return (getRequestJson.tracks.items.map(track => ({
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        id: track.id,
        uri: track.uri
      })))
    } catch (error) {
      console.log(error);
    }
  },
  async savePlaylist(playlistName, trackUris) {

    try {

      if (!playlistName || !trackUris) {
        return;
      }

      this.getAccessToken();

      const headers = { Authorization: `Bearer ${access_token}` };

      const getUserId = await fetch('https://api.spotify.com/v1/me', { headers: headers });
      const getUserIdJSON = await getUserId.json();
      const user_Id = getUserIdJSON.id;
      const createPlaylist = await fetch(`https://api.spotify.com/v1/users/${user_Id}/playlists`,
        {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({
            name: playlistName
          })
        })
      const createPlaylistJSON = await createPlaylist.json();
      const playlist_Id = createPlaylistJSON.id;

      await fetch(`https://api.spotify.com/v1/users/${user_Id}/playlists/${playlist_Id}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ uris: trackUris })
      })

    } catch (err) {
      console.log(err);
    }
  }
  //Native promises syntax
  /* savePlaylist(playlistName, trackUris) {
    if(!playlistName || !trackUris){
      return;
    }


    this.getAccessToken();


    let user_Id;
    const headers = { Authorization: `Bearer ${access_token}` };

    return fetch('https://api.spotify.com/v1/me', { headers: headers }
    ).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed!')
      }
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      user_Id = jsonResponse["id"]
      debugger;
      return fetch(`https://api.spotify.com/v1/users/${user_Id}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          name: playlistName
          //"description": "Jammming user playlist",
          //"public": true
        })
      }
      )
    }).then(
      response => {

        if (response.ok) {
          return response.json();
        }
        debugger;
        throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
    ).then(
      jsonResponse => {
        const playlist_Id = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${user_Id}/playlists/${playlist_Id}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackUris })
        })
      });
  } */

}

export default Spotify;
