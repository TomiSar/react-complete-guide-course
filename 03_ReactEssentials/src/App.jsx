import React from 'react';
import Header from './components/Header/Header.jsx';
import ReactDocsLink from './components/Link/ReactDocsLink.jsx';
import CoreConcepts from './components/CoreConcepts.jsx';
import Examples from './components/Examples.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
        <ReactDocsLink />
      </main>
    </>
  );
}

export default App;
