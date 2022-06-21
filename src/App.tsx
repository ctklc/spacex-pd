import { useQuery } from '@apollo/client';
import { Ship, ShipVars } from './api/types';
import { SHIPS } from './api';
import './App.css';

function App() {
  const { loading, data } = useQuery<Ship[], ShipVars>(SHIPS, {
    variables: { limit: 10 }
  });

  console.log(loading, data);

  return <div className="App">ParkDepot Spacex</div>;
}

export default App;
