import * as React from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Home from "./scenes/home/home.scene";

export default class AppRouter extends React.Component<{}, {}> {

    render() {
        return (
            <Router>
                {/*<div>
                    <h2>Accounts</h2>
                    <ul>
                        <li><Link to="/netflix">Netflix</Link></li>
                        <li><Link to="/zillow-group">Zillow Group</Link></li>
                        <li><Link to="/yahoo">Yahoo</Link></li>
                        <li><Link to="/modus-create">Modus Create</Link></li>
                    </ul>*/}

                    {/*<Route path="/:id" component={Hello as any}/>*/}
                    <Route path="/" component={Home}/>
                {/*</div>*/}
            </Router>
        );
    }
}