 import React, { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function GestionDesComptes() {
  // États pour la liste de comptes et le formulaire d'ajout
  const [comptes, setComptes] = useLocalStorage("comptes", []);
  const [nom, setNom] = useState("");
  const [solde, setSolde] = useState(0);

  // États d'édition inline
  const [editingId, setEditingId] = useState(null);
  const [editNom, setEditNom] = useState("");
  const [editSolde, setEditSolde] = useState("");

  // Ajout d'un nouveau compte
  const ajouterCompte = (e) => {
    e.preventDefault();
    const nouveau = { id: Date.now(), nom, solde: parseFloat(solde) };
    setComptes([...comptes, nouveau]);
    setNom("");
    setSolde(0);
  };

  // Suppression
  const supprimerCompte = (id) => {
    if (window.confirm("Confirmer la suppression ?")) {
      setComptes(comptes.filter((c) => c.id !== id));
    }
  };

  // Début de l'édition inline
  const startEdition = (compte) => {
    setEditingId(compte.id);
    setEditNom(compte.nom);
    setEditSolde(compte.solde.toString());
  };

  // Sauvegarde de l'édition
  const saveEdition = (id) => {
    const nouveauSolde = parseFloat(editSolde);
    if (isNaN(nouveauSolde)) {
      alert("Solde invalide !");
      return;
    }
    setComptes(
      comptes.map((c) =>
        c.id === id ? { ...c, nom: editNom, solde: nouveauSolde } : c
      )
    );
    setEditingId(null);
  };

  const cancelEdition = () => {
    setEditingId(null);
  };

  return (
    <div className="p-4">
      <form onSubmit={ajouterCompte} className="max-w-md mx-auto mb-6">
        <h2 className="text-xl font-bold mb-4">Ajouter un compte</h2>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Solde"
          value={solde}
          onChange={(e) => setSolde(e.target.value)}
          required
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Ajouter
        </button>
      </form>


      <h2 className="text-xl font-bold mb-4">Liste des comptes</h2>
      {comptes.length === 0 ? (
        <p>Aucun compte enregistré!!!!</p>
      ) : (
        <table className="table"> { /*min-w-full border-collapse*/}
          <thead>
            <tr>
              <th className="border p-2">Nom</th>
              <th className="border p-2">Solde</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comptes.map((compte) => (
              <tr key={compte.id}>
                {editingId === compte.id ? (
                  <>
                    <td className="border p-2">
                      <input
                        value={editNom}
                        onChange={(e) => setEditNom(e.target.value)}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        value={editSolde}
                        onChange={(e) => setEditSolde(e.target.value)}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border p-2 space-x-2">
                      <button
                        onClick={() => saveEdition(compte.id)}
                        className="text-green-600"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={cancelEdition}
                        className="text-gray-600"
                      >
                        Annuler
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border p-2">{compte.nom}</td>
                    <td className="border p-2">{compte.solde}DH</td>
                    <td className="border p-2 space-x-2">
                      <button
                        onClick={() => startEdition(compte)}
                        className="text-blue-600"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => supprimerCompte(compte.id)}
                        className="text-red-600"
                      >
                        Supprimer
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 
