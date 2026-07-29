import { useEffect, useState } from 'react';

const GRAPHQL_URL = 'https://api.github.com/graphql';

const QUERY = `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

// Fetches the same contributionsCollection data GitHub's own profile page
// renders, so the "last year" rolling window and past calendar years match
// github.com exactly instead of us re-deriving counts from paginated commits.
function useContributions(login, accessToken, range) {
  const [weeks, setWeeks] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!login || !accessToken || !range) return;

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login, from: range.from, to: range.to },
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (cancelled) return;
        if (json.errors?.length) {
          throw new Error(json.errors.map((e) => e.message).join('; '));
        }
        const calendar =
          json.data?.user?.contributionsCollection?.contributionCalendar;
        setWeeks(calendar?.weeks || []);
        setTotalContributions(calendar?.totalContributions || 0);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Error fetching GitHub contributions:', err);
        setError(err);
        setWeeks([]);
        setTotalContributions(0);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [login, accessToken, range?.from, range?.to]);

  return { weeks, totalContributions, isLoading, error };
}

export default useContributions;
