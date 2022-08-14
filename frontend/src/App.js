import React  from 'react';
import Search from './components/Search';
import FileUpload from './components/FileUpload'

function App() {
    console.log(process.env.REACT_APP_SECRET_ACCESS_KEY)
    return (
        <div className="tc bg-green ma0 pa4 min-vh-100">
            <FileUpload />
            <Search />
        </div>
    );
}

export default App;
