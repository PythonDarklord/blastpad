export const runtime = "edge";

export default async function handler(req) {
  try {
    const { query, token } = await req.json();
    const data = await searchReddit(query, token);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching Reddit data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
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
