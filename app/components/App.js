var React = require('react');
var ReactDOM = require('react-dom');
var Popular = require('./Popular');
var Home = require('./Home');
var ReactRouter = require('react-router-dom');
var Switch = ReactRouter.Switch;
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Nav = require('./Nav')


class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Nav/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/battle' component={Home}/>
                        <Route path='/popular' component={Popular}/>
                        <Route render={function () {
                            return <p>404! Not Found</p>
                        }}/>
                        <Route />
                    </Switch>
                </div>
            </Router>

        )
    }
}

module.exports = App;