import { useState } from 'react';

export default function useSearchList() {
  const [searchWord] = useState('try');

  return {
    searchWord,
  };
}
