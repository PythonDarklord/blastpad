export const runtime = "edge";

export default async function handler(req) {
  try {
    const token = await getToken();
    return new Response(JSON.stringify(token), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch token' }), { status: 500 });
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
