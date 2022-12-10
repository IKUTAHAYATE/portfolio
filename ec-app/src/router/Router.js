import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import List from '../components/pages/List'
import Detail from '../components/pages/Detail';
import Home from '../components/pages/Home';
import Page404 from '../components/pages/Page404';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='/' element={< Home />} />
                    <Route path='/list' element={< List />} />
                    <Route path='/detail' element={< Detail />} />
                    <Route path='/*' element={< Page404 />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;