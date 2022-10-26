import axiosModule from 'axios';
import { helperGetTeamImageName } from '../helpers/helpers';

const axios = axiosModule.create({ baseURL: 'http://localhost:3002' });

function sanitizeData(teamData) {
  const {
    total_derrotas: defeats,
    total_empates: draws,
    total_vitorias: victories,
    total_gols_marcados: scoredGoals,
    total_gols_sofridos: takenGoals,
    total_jogos: matches,
    total_pontos: points,
  } = teamData;

  const balance = scoredGoals - takenGoals;

  return {
    defeats,
    draws,
    victories,
    scoredGoals,
    takenGoals,
    matches,
    points,
    balance,
  };
}

async function apiGetChampionshipData(year) {
  const { data: championshipData } = await axios.get(`/${year}`);
  const lastRound = championshipData.length - 1;
  let { partidas: matches } = championshipData[lastRound];

  matches = matches
    .flatMap(item => {
      let {
        mandante: host,
        visitante: visitor,
        pontuacao_geral_mandante: hostData,
        pontuacao_geral_visitante: visitorData,
      } = item;

      hostData = sanitizeData(hostData);
      visitorData = sanitizeData(visitorData);

      const hostImageName = helperGetTeamImageName(host);
      const visitorImageName = helperGetTeamImageName(visitor);

      return [
        { teamName: host, imageName: hostImageName, ...hostData },
        { teamName: visitor, imageName: visitorImageName, ...visitorData },
      ];
    })
    .sort((a, b) => b.points - a.points);

  return matches;
}

export { apiGetChampionshipData };
