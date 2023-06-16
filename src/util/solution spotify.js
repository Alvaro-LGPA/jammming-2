// import SearchBar from "../Components/SearchBar/SearchBar";

let accessToken;

const clientID = '08bce8ac0c3b407d945f566587d9903d';
const redirectURI = "http://localhost:3000/";


const Spotify = {
    getAccessToken() {  // Investiga si todo lo que viene a continuación es un template a usar con cualquier otra API, si esta descrito en la documentación de Spotify o si es una forma propia de Codecademy
        let userURL = window.location.href;

        // Check for an access token match

        if (accessToken) {  // Si el access token existe, usalo. Pero... y lo del clear parameter? en que caso da tiempo a que haya un token aquí?
            //window.alert(`access token existe: ${accessToken}`);
            return accessToken;

        }

        let accessTokenMatch = userURL.match(/access_token=([^&]*)/)
        let expiresInMatch = userURL.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) { // investigar si esto es un template de como hacer las cosas
            //window.alert(`El nuevo token se obtiene de la direccion en el navegador: ${accessTokenMatch}`);
            accessToken = accessTokenMatch[1]; // imposible haber sabido qué poner aquí sin saber qué devuelve .match
            const expiresIn = Number(expiresInMatch[1]); // imposible haber sabido qué poner aquí sin saber qué devuelve .match

            // This clears the parameters, allowing us to grab a new access token when it expires | investigar si esto es un template de como hacer las cosas

            // window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.setTimeout(() => {
                accessToken = '';
                //window.alert(`Limpiar la variable accesstoken: ${accessToken}`);
            }, expiresIn * 1000)

            //window.alert(`PushState para eliminar el token de la direccion del navegador: ${accessToken}`)
            window.history.pushState('Access Token', null, '/');

            
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-private&redirect_uri=${redirectURI}`;
            //window.alert('No se ha generado ningún token todavía, así que redireccionamos para que el usuario reciba un token temporal en la barra de dirección')
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${accessToken}` } // This is comming/required from the Soptify API documentation
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

                // code to execute with jsonResponse
                if (!jsonResponse.tracks) {
                    return [];
                }
                console.log(`Search: ${jsonResponse}`) // aquí si funciona!!! NO LO BORRES!!
                // It is not possible to have known what to put in here before seen what is gonna be returned by the API

                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri

                }));

            });


    },

    savePlaylist(playlistName, tracksURIs) {
        

        if (!playlistName || !tracksURIs) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        
        //window.alert(accessToken);
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID;
        let playlistID;


        // Get user ID

        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
                
                throw new Error('Request failed!');
            }, networkError => console.log(networkError.message)
        ).then( 
            jsonResponse => {
                // Code to exectute with jsonResponse
                userID = jsonResponse.id;
                // Create Playlist
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({
                        name: playlistName,
                        description: "New playlist description",
                        public: false
                    })
                }
                ).then(
                    response => {
                        if (response.ok) {
                            window.alert(`PlaylistName: ${playlistName}`)
                            return response.json();
                        }
                        throw new Error('Request failed!');
                    }, networkError => console.log(networkError.message)
                ).then(
                    jsonResponse => {
                        // Code to execute with jsonResponse
                        playlistID = jsonResponse.id;
                        // Add Track (WIP)

                        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({
                                uris: tracksURIs

                            }
                            )
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
                                // Code to exectute with jsonResponse
                                console.log(`AddTrack jsonResponse: ${jsonResponse}`)
                                playlistID = jsonResponse.id;

                            }
                        );
                    });
            }
        )









    }

}




export default Spotify;