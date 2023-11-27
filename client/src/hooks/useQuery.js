import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => {
    const queryString = search.startsWith('?') ? search.substring(1) : search;
    const params = new URLSearchParams();
    const paramPairs = queryString.split('&');
    paramPairs.forEach(paramPair => {
      const equalIndex = paramPair.indexOf('=');
      if (equalIndex !== -1) {
        const key = paramPair.substring(0, equalIndex);
        const value = paramPair.substring(equalIndex + 1);
        params.set(key, value);
      } else {
        params.append(paramPair, '');
      }
    });
    return params;
  }, [search]);
};
