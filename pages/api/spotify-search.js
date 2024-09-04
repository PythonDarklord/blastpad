export default async function handler(req, res) {
  try {
    const { query, token } = await req.body;
    const data = await searchSpotify(query, token);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: e});
  }
}

async function searchSpotify(query, token) {
  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=4`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to search Spotify');
  }

  return await response.json();
}
