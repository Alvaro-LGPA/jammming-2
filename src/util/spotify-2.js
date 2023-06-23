
const clientId = 'b4ddea724f004dd9803b28998ac8738c'; // Your client id
const redirectUri = 'http://localhost:3000/'; // Your redirect uri
let access_token;

const Spotify = {
    getAccessToken() {
        if (access_token) {
          return access_token;
        }
    
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
          access_token = accessTokenMatch[1];
          const expiresIn = Number(expiresInMatch[1]);
          window.setTimeout(() => access_token = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
          return access_token;
        } else {
          const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
          window.location = accessUrl;
        }
      }
    ,


  search(searchQuery) {
    
    if(!access_token){
      this.getAccessToken();
    }
    
    return fetch('https://api.spotify.com/v1/search?q=' + searchQuery + '&type=track',
      {
        headers: { 'Authorization': 'Bearer ' + access_token }
      }
    ).then(
      response => {
        
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
    ).then(
      jsonResponse => {

        //code to execute with jsonResponse
        //console.log(jsonResponse)
        return (jsonResponse.tracks.items.map((track) =>
        ({
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          id: track.id,
          uri: track.uri

        })))
      }
    )

  },

  savePlaylist(playlistName, trackUris) {
    
    
    this.getAccessToken();
    
    let user_Id;
    const headers = { Authorization: `Bearer ${access_token}` };
    
    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed!')
      }
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      user_Id = jsonResponse["id"];
      
      return fetch(`https://api.spotify.com/v1/users/${user_Id}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          name:  playlistName 
        })
      }
      )
    }).then(
      response => {
        
        if (response.ok) {
            debugger;
          return response.json();
        }
        
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
  }

}

export default Spotify;
