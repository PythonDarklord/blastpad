export const runtime = "edge";

export default async function handler(req, res) {
  try {
    const token = await getToken();
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch token' });
  }
}

async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': process.env.SPOTIFY_CLIENT_ID,
      'client_secret': process.env.SPOTIFY_CLIENT_SECRET,
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch token');
  }

  return await response.json();
}
