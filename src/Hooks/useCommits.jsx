import { useState, useEffect } from 'react';

function useCommits(owner, repositories, accessToken) {
  const [dateFrequencyMap, setDateFrequencyMap] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Initialize as loading

  useEffect(() => {
    const fetchData = async () => {
      const allCommitDates = [];

      // Create an array of promises for fetch requests
      const fetchPromises = repositories.map(async (repo) => {

        //https://api.github.com/repos/tanvirim/-API-Data-Visibility-/commits/main
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/commits`, 
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },  
          }
        );
                                                                        
        if (response.ok) {
          const data = await response.json();
          
          const commitDates = data?.map((commits) => {
            const date = new Date(commits.commit.author.date);
            // Format the date as YYYY-MM-DD
            return date.toISOString().split('T')[0];
          });
          allCommitDates.push(...commitDates);
         
        } else {
          console.error(`Error fetching data from ${repo}: ${response.status} - ${response.statusText}`);
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
