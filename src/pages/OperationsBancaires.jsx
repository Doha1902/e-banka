import React, { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function OperationsBancaires() {
  const [comptes, setComptes] = useLocalStorage("comptes", []);
  const [selectedId, setSelectedId] = useState(
    comptes.length > 0 ? comptes[0].id : ""
  );
  const [montant, setMontant] = useState("");

  const selectedCompte = comptes.find((c) => c.id === selectedId);

  const handleOperation = (type) => {
    const m = parseFloat(montant);
    if (isNaN(m) || m <= 0) {
      alert("Veuillez saisir un montant valide (> 0).");
      return;
    }

    setComptes(
      comptes.map((c) => {
        if (c.id === selectedId) {
          if (type === "retrait" && c.solde < m) {
            alert("Solde insuffisant pour ce retrait.");
            return c;
          }
          return {
            ...c,
            solde: type === "depot" ? c.solde + m : c.solde - m,
          };
        }
        return c;
      })
    );

    setMontant("");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-50 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
        💰 Opérations Bancaires
      </h2>

      {comptes.length === 0 ? (
        <p className="text-red-600 text-center">
          Aucun compte disponible. Ajoutez-en d’abord.
        </p>
      ) : (
        <>
          {/* Choix du compte */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Sélectionnez un compte :
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(parseInt(e.target.value))}
              className="border p-2 w-full rounded"
            >
              {comptes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Info Compte sélectionné */}
          {selectedCompte && (
            <div className="mb-4 bg-white border border-gray-200 p-4 rounded text-center">
              <p className="text-gray-600 text-sm mb-1">Compte sélectionné :</p>
              <p className="text-lg font-semibold text-blue-700">{selectedCompte.nom}</p>
              <p className="text-gray-700">
                Solde actuel :{" "}
                <span className="font-bold text-green-600">
                  {parseFloat(selectedCompte.solde).toFixed(2)} DH
                </span>
              </p>
            </div>
          )}

          {/* Montant */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Montant (DH) :
            </label>
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              className="border p-2 w-full rounded"
              placeholder="0.00"
            />
          </div>
          <br/>
          {/* Boutons */}
          <div className="flex gap-4">
            <button
              onClick={() => handleOperation("depot")}
              className="flex-1 bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Dépôt
            </button>
            <button
              onClick={() => handleOperation("retrait")}
              className="flex-1 bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              Retrait
            </button>
          </div>
        </>
      )}
    </div>
  );
}
