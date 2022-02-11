import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import FForm from './pages/FForm';
import Home from './pages/Home';
import EditForm from './pages/EditForm';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/form' element={<FForm />} />
          <Route path='/edit-form' element={<EditForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
