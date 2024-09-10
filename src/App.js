import logo from './logo.svg';
import './App.css';
import './styles.css';
import { useReducer } from 'react';
import TicketForm from './container/TicketForm';
import ticketReducer from './reducer/ticketReducer';
import TicketList from './container/TicketList';
import sortAlgorithom from './utilities/sortAlgorithom';

function App() {

  const initialState = {tickets:[], editingTicket: null, sortPreference: "High to Low"}

  const [state, dispatch] = useReducer(ticketReducer, initialState)

  const sortedTickets = sortAlgorithom(state.tickets, state.sortPreference)

  return (
    <div className="App">
      <div className="container">
        <h1>Bug Blaster</h1>
        <TicketForm dispatch={dispatch} editingTicket={state.editingTicket}></TicketForm>
        {state.tickets.length > 0 && (
          <div className='results'> 
            <h2>All Tickets</h2>
            <select value={state.sortPreference} onChange={(e)=>dispatch({type:"SORT_PREFERENCE", payload:e.target.value})}>
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>
            </select>
            <TicketList tickets={sortedTickets} dispatch={dispatch}></TicketList>
          </div>)
        }
      </div>
    </div>
  );
}

export default App;
