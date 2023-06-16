let stateKey = 'spotify_auth_state';

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
  let hashParams = {};
  let e, r = /([^&;=]+)=?([^&;]*)/g,
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
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let params = getHashParams();

let access_token = params.access_token,
  state = params.state,
  storedState = localStorage.getItem(stateKey);


console.log(params)
function authenticate() {
  if (access_token) {
    console.log(access_token)
    return access_token
  } else {
    let client_id = 'b4ddea724f004dd9803b28998ac8738c'; // Your client id
    let redirect_uri = 'http://localhost:3000/'; // Your redirect uri

    let state = generateRandomString(16);

    localStorage.setItem(stateKey, state);
    let scope = 'user-read-private user-read-email';

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    url += '&show_dialog=' + false;

    window.location = url;


  }

};

// This commented code uses synchronous call.
/* const getData = (searchQuery) => {
  window.alert(searchQuery)

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
      console.log(jsonResponse)
    }
  )

}   */

// This is an asyncrhonous call.
const getData = async (searchQuery) => {
  authenticate();
  try {
    const response = await fetch('https://api.spotify.com/v1/search?q=' + searchQuery + '&type=track',
      {
        headers: { 'Authorization': 'Bearer ' + access_token }
      });
    if (response.ok) {
      const jsonResponse = await response.json();
      // Code to execute with jsonResponse
      console.log(jsonResponse)
      console.log(access_token)
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error.message);
  }
}

function testButton() {

  // authenticate();
  const searchQuery = document.getElementById("search-query").value;
  getData(encodeURIComponent(searchQuery));

}

export default testButton;
