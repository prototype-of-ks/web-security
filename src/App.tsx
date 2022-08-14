
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Csrf from './pages/Csrf';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/csrf" element={<Csrf />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
