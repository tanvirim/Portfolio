import { useState, useEffect } from 'react';

function useGitHubRepos(accessToken) {
  const [repos, setRepos] = useState([]);
  const perPage = 100;
  const page = 1;
  useEffect(() => {
    // Ensure the access token is provided
    if (!accessToken) {
      console.error('Access token is missing.');
      return;
    }

    fetch(`https://api.github.com/user/repos?page=${page}&per_page=${perPage}&affiliation=owner,collaborator,organization_member`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data",data)

        // full_name (owner/repo) so each repo's commits URL is correct
        // even for repos not owned by the configured VITE_GITHUB_USERNAME
        // (e.g. renamed accounts, org repos, or forks).
        const repoFullNames = data?.map((repo) => repo.full_name);
        console.log("repoFullNames",repoFullNames)
        setRepos(repoFullNames);
      })
      .catch((error) => {
        console.error('Error fetching data from GitHub API:', error);
      });
  }, [accessToken, page, perPage]);

  return repos;
}

export default useGitHubRepos;
