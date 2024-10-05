import './App.css'; 
import Upload from './pages/Upload';
import Show from './pages/Show';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './context/Firebase'; // Import FirebaseProvider

export default function App() {
  return (
    <FirebaseProvider> {/* Wrap your application with FirebaseProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/show" element={<Show />} /> 
        </Routes>
      </Router>
    </FirebaseProvider>
  );
}