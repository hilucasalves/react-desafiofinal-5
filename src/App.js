import { apiGetChampionshipData } from './api/api';
import {
  NavLink,
  Route,
  BrowserRouter,
  Redirect,
  Switch,
} from 'react-router-dom';
import ChampionshipPage from './components/ChampionshipPage';

const FIRST_YEAR = 2003;
const LAST_YEAR = 2015;
const YEARS = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }).map(
  (_, index) => {
    return FIRST_YEAR + index;
  }
);

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <div className="bg-gray-100 mx-auto p-4">
            <h1 className="text-center font-semibold text-xl">
              react-campeonato-brasileiro
            </h1>
          </div>
        </header>

        <main>
          <div className="container mx-auto p-4">
            <ul className="flex flex-row flex-wrap justify-center">
              {YEARS.map(year => {
                return (
                  <li key={year} className="mx-2 cursor-pointer">
                    <NavLink to={`/${year}`} activeClassName="selected-year">
                      {year}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <Switch>
              {YEARS.map(year => {
                return (
                  <Route key={year} path={`/${year}`} exact>
                    <ChampionshipPage />
                  </Route>
                );
              })}
            </Switch>
            <Redirect to="/2003" />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
