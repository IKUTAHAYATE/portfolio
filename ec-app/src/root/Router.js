import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import List from '../views/pages/List';
import Detail from '../views/pages/Detail';
import Home from '../views/pages/Home';
import Page404 from '../views/pages/Page404';

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