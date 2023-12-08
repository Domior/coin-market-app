import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => {
    const removeQuestionMark = str => (str.startsWith('?') ? str.substring(1) : str);
    const queryParams = new URLSearchParams(removeQuestionMark(search));

    return queryParams;
  }, [search]);
};
