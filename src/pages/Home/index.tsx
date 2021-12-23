import { useEffect, useState } from 'react';
import { ScrollView } from '@tarojs/components';
import SearchBar from '@/components/SearchBar';
import Layout from '@/components/Layout';
import Banner from './components/Banner';
import Category from './components/Category';
import Recommend from './components/Recommend';
import NewSong from './components/NewSong';

import './index.scss';

export default function Home() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (IS_H5) {
      window.document.addEventListener('scroll', onScroll);
    }
    return () => {
      if (IS_H5)
        window.document.removeEventListener('scroll', onScroll);
    };
  }, []);

  function onScroll(e) {
    let scrollTop;
    if (IS_H5) {
      scrollTop = document.documentElement.scrollTop;
    } else {
      scrollTop = e.detail.scrollTop;
    }
    if (scrollTop > 0) {
      setTimeout(() => {
        setIsScrolling(true);
      }, 50);
    } else {
      setTimeout(() => {
        setIsScrolling(false);
      }, 50);
    }
  }

  return (
    <Layout outerStyle={{ backgroundColor: '#fff' }}>
      <SearchBar isScrolling={isScrolling} />
      <ScrollView
        scrollY
        style={{ backgroundColor: '#eee' }}
        onScroll={onScroll}
      >
        <Banner />
        <Category />
        <Recommend />
        <NewSong />
      </ScrollView>
    </Layout>
  );
}
