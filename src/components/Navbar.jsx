import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
  <h1><Link to="/">e-Banka</Link></h1>
  <ul> 
    <li><Link to="/">🏦Accueil</Link></li>
    <li><Link to="/GestionDesComptes">💼Gestion des Comptes</Link></li>
    <li><Link to="/OperationsBancaires">💰Opérations</Link></li>
    <li><Link to="/statistique"> 📊statistiques</Link></li>
  </ul>
</nav>
  );
}