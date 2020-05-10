import React from 'react';

import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import GithubCorner from '../github/Corner';
import FloatCart from '../FloatCart';
import SearchBar from '../Shelf/SearchBar';

const App = () => (
  <React.Fragment>
    <GithubCorner />
    <SearchBar />
    <main>
      <Filter />     
      <Shelf />
    </main>
    <FloatCart />
  </React.Fragment>
);

export default App;
