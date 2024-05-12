import './App.css';
import UserTable from './components/Table';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <UserTable />
    </Provider>
  );
}

export default App;
