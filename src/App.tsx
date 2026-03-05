import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Logs from './pages/Logs';

function App() {
  return (
    <Router>
      {/* min-h-screen ensures it takes up at least the full height of the laptop monitor */}
      <div className="min-h-screen w-screen flex flex-col bg-slate-50">
        
        <nav className="w-full bg-white border-b border-slate-200 px-10 py-5 flex justify-between items-center shadow-sm">
          <span className="text-xl font-black text-blue-600 tracking-tighter">DATALOGGER_v1</span>
          <div className="flex gap-10">
            <Link to="/" className="font-medium hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/logs" className="font-medium hover:text-blue-600 transition-colors">Logs</Link>
          </div>
        </nav>

        {/* This main area will now expand to the full width of your laptop screen */}
        <main className="flex-grow w-full px-10 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logs" element={<Logs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;