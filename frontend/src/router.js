import {Switch,Route} from 'react-router-dom'
import SignUp from './components/signup'
import SignIn from './components/login';
import Home from './components/home';


const Baserouter=()=>(
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={SignIn}/>
            <Route exact path="/signup" component={SignUp}/>
        </Switch>
    )


export default Baserouter;