import { useEffect, useState } from 'react';
import { getSearchHot } from '@/services/api';

export default function useSearchRecommend() {
  const [data, setData] = useState<Array<string>>([]);

  useEffect(() => {
    getSearchHot().then(res => {
      if (res && res.length > 0) {
        setData(res.map(_ => _.first));
      } else {
        setData([]);
      }
    });
  }, []);

  return {
    data,
  };
}
