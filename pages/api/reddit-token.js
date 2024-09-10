const REDDIT_TOKEN_URL = "https://www.reddit.com/api/v1/access_token";

const getAppAccessToken = async () => {
  try {
    const clientId = process.env.REDDIT_CLIENT_ID;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET;

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch(REDDIT_TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error obtaining access token:", error);
    throw new Error("Failed to get access token.");
  }
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const accessToken = await getAppAccessToken();
      res.status(200).json({ accessToken });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get access token' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}