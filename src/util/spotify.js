var stateKey = 'spotify_auth_state';

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
 
  return hashParams;
}

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};



var params = getHashParams();

var access_token = params.access_token,
  state = params.state,
  storedState = localStorage.getItem(stateKey);



const getData = async () => {
  try {
    const response = await fetch({
      url: 'https://api.spotify.com/v1/me',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      // Code to execute with jsonResponse
    }
    throw new Error('Request failed!');
  } catch (error) {
    console.log(error);
  }
}








function getAccessToken () {

  var client_id = 'b4ddea724f004dd9803b28998ac8738c'; // Your client id
  var redirect_uri = 'http://localhost:3000/'; // Your redirect uri

  var state = generateRandomString(16);

  localStorage.setItem(stateKey, state);
  var scope = 'user-read-private user-read-email';

  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);

  window.location = url;
};



function testButton() {
  getAccessToken();
}

export default testButton;
