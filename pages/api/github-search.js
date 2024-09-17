export const runtime = "edge";

import {Octokit} from "@octokit/rest";
import {createAppAuth} from "@octokit/auth-app";

export default async function handler(req, res) {
  try {
    const {query} = req.body;
    const data = await searchGithub(query);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
}

async function searchGithub(query) {
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_PRIVATE_KEY,
      installationId: process.env.GITHUB_INSTALLATION_ID,
    },
  });

  const response = await octokit.rest.search.repos({
    q: query,
    sort: "stars",
    order: "desc",
    per_page: 4,
  });

  return response.data;
}