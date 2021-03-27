import { ThemeProvider } from '@material-ui/styles';
import Header from './components/Header'
import theme from './components/ui/Theme'
import Homepage from './components/Homepage'
import Editpost from './components/Editpost'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Addpost from './components/Addpost'
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
              <Route exact path="/" component={Homepage}/>
              <Route exact path="/add" component={Addpost}/>
              <Route exact path="/post/edit/:postId" component={Editpost} />
        </Switch>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;

