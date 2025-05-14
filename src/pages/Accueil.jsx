import React from "react";
import { Link } from "react-router-dom";
import '../styles/styles.css'; 

// Import images 
import im1_1 from "../image/1-1.jpg";
import im1_2 from "../image/1-2.jpg";
import im1_3 from "../image/1-3.jpg";
import im2_1 from "../image/2-1.jpg";
import im2_2 from "../image/2-2.jpg";
import im2_3 from "../image/2-3.jpg";
import im3_1 from "../image/3-1.jpg";
import im3_2 from "../image/3-2.jpg";
import im3_3 from "../image/3-3.jpg";



const Accueil = () => {
  return (
    <div className="accueil-container">
      <div className="accueil-content">
        {/* Title */}
        <h1 className="accueil-title">
          Plateforme de Gestion Bancaire
        </h1>

        {/* Description */}
        <p className="accueil-description">
          Une interface moderne, intuitive et rapide pour gérer vos comptes bancaires en toute simplicité.
        </p>

        {/* Features grid */}
        <div className="features-grid">
          {/* Gestion des Comptes */}
          <div className="feature-card">
            <h3 className="feature-title">💼 Gestion des Comptes</h3>
            <p className="feature-description">
              Ajoutez, modifiez ou supprimez vos comptes bancaires facilement.
            </p>
            <Link to="/GestionDesComptes" className="feature-button">
              📑 Gérer les comptes
            </Link>
            <div className="feature-images">
              <img src={im1_1} alt="Compte 1" className="feature-image" />
              <img src={im1_2} alt="Compte 2" className="feature-image" />
              <img src={im1_3} alt="Compte 3" className="feature-image" />
            </div>
          </div>

          {/* Opérations Bancaires */}
          <div className="feature-card">
            <h3 className="feature-title">💰 Opérations Bancaires</h3>
            <p className="feature-description">
              Effectuez des dépôts et retraits en quelques clics.
            </p>
            <Link to="/OperationsBancaires" className="feature-button">
              💵 Effectuer une opération
            </Link>
            <div className="feature-images">
              <img src={im2_1} alt="Op 1" className="feature-image" />
              <img src={im2_2} alt="Op 2" className="feature-image" />
              <img src={im2_3} alt="Op 3" className="feature-image" />
            </div>
          </div>

          {/* Statistiques */}
          <div className="feature-card">
            <h3 className="feature-title">📊 Statistiques</h3>
            <p className="feature-description">
              Visualisez vos statistiques financières avec des graphiques clairs.
            </p>
            <Link to="/statistique" className="feature-button">
              📈 Voir les statistiques
            </Link>
            <div className="feature-images">
              <img src={im3_1} alt="Stat 1" className="feature-image" />
              <img src={im3_2} alt="Stat 2" className="feature-image" />
              <img src={im3_3} alt="Stat 3" className="feature-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
