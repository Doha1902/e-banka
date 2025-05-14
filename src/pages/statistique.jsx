import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4"];

export default function Statistique() {
  const [comptes] = useLocalStorage("comptes", []);
  const count = comptes.length;
  const total = comptes.reduce((sum, c) => sum + parseFloat(c.solde || 0), 0);
  const moyenne = count > 0 ? (total / count).toFixed(2) : 0;

  const data = comptes.map((c) => ({
    name: c.nom,
    value: parseFloat(c.solde || 0),
  }));

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-center text-blue-800">📊 Statistiques Bancaires</h2>

        {/* Résumé Statistique */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Nombre de comptes:" value={count} color="text-blue-700" />
          <StatCard label="Solde total:" value={`${total.toFixed(2)} DH`} color="text-green-700" />
          <StatCard label="Solde moyen:" value={`${moyenne} DH`} color="text-purple-700" />
        </div>

        {/* Tableau des Comptes */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">📋 Liste des Comptes</h3>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Nom</th>
                <th className="border p-3 text-right">Solde (DH)</th>
              </tr>
            </thead>
            <tbody>
              {comptes.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="border p-3">{c.nom}</td>
                  <td className="border p-3 text-right">{parseFloat(c.solde).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Graphique */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">📈 Répartition des soldes</h3>
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-600">Aucun compte à afficher.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// 💡 Reusable Stat Card component
function StatCard({ label, value, color }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 text-center">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
}
