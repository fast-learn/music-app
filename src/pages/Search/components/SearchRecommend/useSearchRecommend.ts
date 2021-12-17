import { useEffect, useState } from 'react';

export default function useSearchRecommend() {
  const [data, setData] = useState<Array<string>>([]);

  useEffect(() => {
    setData(['特别的人', '给你给我', '位置']);
  }, []);

  return {
    data,
  }
}
