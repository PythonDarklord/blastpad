import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Initialize Octokit with GitHub App authentication
    const octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: process.env.GITHUB_APP_ID,
        privateKey: process.env.GITHUB_PRIVATE_KEY,
        installationId: process.env.GITHUB_INSTALLATION_ID,
      },
    });

    // Make a request to the GitHub Search API
    const response = await octokit.rest.search.repos({
      q: "octokit", // Example query, adjust as needed
      sort: "stars",
      order: "desc",
      per_page: 5,
    });

    // Send the response data back to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}