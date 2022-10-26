import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { apiGetChampionshipData } from '../api/api';

export default function ChampionshipPage() {
  const { pathname } = useLocation();
  const year = Number(pathname.substring(1));
  const [championshipData, setChampionshipData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getChampionshipDataFromBackend() {
      setLoading(true);
      const backendData = await apiGetChampionshipData(year);
      setChampionshipData(backendData);
      setLoading(false);
    }
    getChampionshipDataFromBackend();
  }, [year]);

  if (loading) {
    return (
      <div className="mt-8 text-center">
        <ClipLoader />
      </div>
    );
  }

  return (
    <>
      <h2 className="font-semibold my-4 text-center text-xl">
        Campeonato Basileiro de {year}
      </h2>
      <h3 className="font-semibold my-4 text-center text-lg">Classificação</h3>

      <table className="mx-auto">
        <thead>
          <tr>
            <th className="w-10"></th>
            <th className="w-10"></th>
            <th className="w-48"></th>
            <th className="w-10">J</th>
            <th className="w-10">P</th>
            <th className="w-10">V</th>
            <th className="w-10">E</th>
            <th className="w-10">D</th>
            <th className="w-10">GP</th>
            <th className="w-10">GC</th>
            <th className="w-10">SG</th>
          </tr>
        </thead>
        <tbody>
          {championshipData.map((team, index) => {
            const {
              balance,
              defeats,
              draws,
              matches,
              points,
              scoredGoals,
              takenGoals,
              teamName,
              victories,
              imageName,
            } = team;

            const ranking = (index + 1).toString().padStart(2, '0');

            return (
              <tr key={ranking} className="text-center">
                <td>{ranking}</td>
                <td>
                  <img
                    width="25px"
                    heigth="25px"
                    src={`/img/${imageName}.png`}
                    alt={teamName}
                    className="my-1"
                  />
                </td>
                <td className="text-left">{teamName}</td>
                <td>{matches}</td>
                <td>{points}</td>
                <td>{victories}</td>
                <td>{draws}</td>
                <td>{defeats}</td>
                <td>{scoredGoals}</td>
                <td>{takenGoals}</td>
                <td>{balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
