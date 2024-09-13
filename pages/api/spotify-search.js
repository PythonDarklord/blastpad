export const runtime = "edge";

export default async function handler(req) {
  try {
    const { query, token } = await req.json();
    const data = await searchSpotify(query, token);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
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
