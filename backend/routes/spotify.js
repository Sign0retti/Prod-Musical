const express = require('express');
const router = express.Router();

let fetch; 

async function getFetch() {
  if (!fetch) {
    fetch = (await import('node-fetch')).default;
  }
  return fetch;
}

async function buscarDados() {
  const fetch = await getFetch();
  const response = await fetch('https://api.spotify.com/...');
  const data = await response.json();
  console.log(data);
}


const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

async function getSpotifyToken() {
  const fetch = await getFetch();

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error('Erro ao obter token: ' + err);
  }

  const data = await response.json();
  return data.access_token;
}

router.get('/playlist', async (req, res) => {
  try {
    const fetch = await getFetch();

    const token = await getSpotifyToken();
    const playlistId = '3XTu6ge82ibwBAA50Doptt';

    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!result.ok) {
      const err = await result.text();
      throw new Error('Erro ao buscar playlist: ' + err);
    }

    const playlist = await result.json();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(playlist);
  } catch (error) {
    console.error('Erro no /playlist:', error.message);
    res.status(500).json({ error: error.message });
  }
  const playlist = await result.json();
const response = {
  name: playlist.name,
  description: playlist.description,
  tracks: playlist.tracks.items.map(item => ({
    name: item.track.name,
    artist: item.track.artists.map(a => a.name).join(', '),
    preview_url: item.track.preview_url,
    image: item.track.album.images[0]?.url
  }))
};
res.status(200).json(response);

});

module.exports = router;
