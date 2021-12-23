import { useState, useEffect } from 'react';
import { getBanner } from '@/services/api';

export default function useBannerList() {
  const [bannerList, setBannerList] = useState<Array<object>>([]);

  useEffect(() => {
    getBanner()
      .then(banner => setBannerList(banner))
      .catch(() => setBannerList([]));
  }, []);

  return {
    bannerList,
  };
}
