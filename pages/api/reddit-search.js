export default async function handler(req, res) {
  try {
    const { query, token } = req.body;
    const data = await searchReddit(query, token);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Reddit data:", error);
    res.status(500).json({ error: "Failed to fetch data from Reddit." });
  }
}

async function searchReddit(query, token) {
  const params = new URLSearchParams({
    query, 
    exact: "false", 
    include_over_18: "false", 
    include_unadvertisable: "true",
    typeahead_active: "true",
  });

  const response = await fetch("https://oauth.reddit.com/api/search_subreddits", {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
