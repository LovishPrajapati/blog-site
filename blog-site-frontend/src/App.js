import Main from "./components/main/Main";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Home from "./components/home/Home";
import Err from "./components/error/Error";
import SingleBlog from "./components/singleBlog/SingleBlog";
import { DataLayer } from "./DataLayer";
import { useContext } from "react";

function App() {
  const { user } = useContext(DataLayer);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {!user ? <Home /> : <Redirect to="/posts" />}
        </Route>
        <Route path="/posts">{user ? <Main /> : <Redirect to="/" />}</Route>
        <Route path="/login" exact>
          {!user ? <Login /> : <Redirect to="/posts" />}
        </Route>
        <Route path="/signup" exact>
          {!user ? <Signup /> : <Redirect to="/posts" />}
        </Route>
        <Route path="/blog/:blogId">
          {user ? <SingleBlog /> : <Redirect to="/" />}
        </Route>
        <Route path="*">
          <Err />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
