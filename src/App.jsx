import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Accueil from "./pages/Accueil";
import GestionDesComptes from "./pages/GestionDesComptes";
import OperationsBancaires from "./pages/OperationsBancaires";
import Statistiques from "./pages/statistique";
import Navbar from "./components/Navbar";
import Footer from "./components/footer"; 
import "./styles/styles.css"; 

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/GestionDesComptes" element={<GestionDesComptes />} />
            <Route path="/OperationsBancaires" element={<OperationsBancaires />} />
            <Route path="/statistique" element={<Statistiques />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
