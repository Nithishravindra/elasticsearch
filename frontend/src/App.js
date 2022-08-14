import React, { useEffect, useState } from 'react';
import Search from './components/Search';

function App() {
    return (
        <div className="tc bg-green ma0 pa4 min-vh-100">
            {/* <Search details={data} /> */}
            <Search />
            {/* <Search details={initialDetails} /> */}
        </div>
    );
}

export default App;
