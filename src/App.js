import './App.css';
import { SnackbarProvider } from 'notistack';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import MainLayout from './Layouts/Main/Main';

function App() {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
    <BrowserRouter>
      <Switch>
        <Redirect exact path="/" to="/main" />
        <Route path="/main" render={ (props) => <MainLayout { ...props } /> } />
        {/* <Route path="/login" render={ (props) => <Login /> }/> */}
        {/* Redirect unhandled routes */}
        <Route>
          <Redirect to="/main" />
        </Route>
      </Switch>
    </BrowserRouter>
  </SnackbarProvider>
  );
}

export default App;
