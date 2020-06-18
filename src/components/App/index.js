import React from 'react';

import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import GithubCorner from '../github/Corner';
import FloatCart from '../FloatCart';
import SearchBar from '../Shelf/SearchBar';
import Logo from '../Logo'


const App = () => (
  <React.Fragment>
    {/* <GithubCorner /> */}
    <Logo />
    <SearchBar />
    <main>
      <Filter />     
      <Shelf />
    </main>
    <FloatCart />
  </React.Fragment>
);

export default App;
