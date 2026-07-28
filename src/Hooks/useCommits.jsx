import { useState, useEffect } from 'react';

const PER_PAGE = 100;
const MAX_PAGES_PER_REPO = 3; // up to 300 commits per repo

function useCommits(owner, repositories, accessToken) {
  const [dateFrequencyMap, setDateFrequencyMap] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Initialize as loading

  useEffect(() => {
    if (!repositories || repositories.length === 0) return;

    const fetchData = async () => {
      const allCommitDates = [];

      // repositories are full_name (owner/repo) values from useGitHubRepos,
      // so each repo's own owner is used instead of the single configured
      // VITE_GITHUB_USERNAME (fixes 404s for repos under a different/renamed owner).
      const fetchPromises = repositories.map(async (repoFullName) => {
        for (let page = 1; page <= MAX_PAGES_PER_REPO; page++) {
          const response = await fetch(
            `https://api.github.com/repos/${repoFullName}/commits?per_page=${PER_PAGE}&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();

            const commitDates = data?.map((commit) => {
              const date = new Date(commit.commit.author.date);
              // Format the date as YYYY-MM-DD
              return date.toISOString().split('T')[0];
            });
            allCommitDates.push(...commitDates);

            if (data.length < PER_PAGE) break; // no more pages for this repo
          } else {
            console.error(`Error fetching data from ${repoFullName}: ${response.status} - ${response.statusText}`);
            break;
          }
        }
      });

      // Wait for all fetch requests to complete
      await Promise.all(fetchPromises);

      // Create an object to store date frequencies
      const dateFrequencies = {};

      // Count the frequency of each date
      allCommitDates.forEach((date) => {
        if (dateFrequencies[date]) {
          dateFrequencies[date] += 1;
        } else {
          dateFrequencies[date] = 1;
        }
      });

      setDateFrequencyMap(dateFrequencies);
      setIsLoading(false); // Data fetching is complete, set loading to false
    };

    fetchData();
  }, [accessToken, owner, repositories]);

  return { dateFrequencyMap, isLoading }; // Return isLoading along with data
}

export default useCommits;
