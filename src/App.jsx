import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { AuthProvider } from "./providers/auth";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
