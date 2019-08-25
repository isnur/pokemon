import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import ToolBar from './components/Toolbar/Toolbar';
import Spinner from './components/Spinner/Spinner';

const Home = lazy(() => import('./containers/Home/Home'));
const Detail = lazy(() => import('./containers/Detail/Detail'));
const MyPokemon = lazy(() => import('./containers/MyPokemon/MyPokemon'));

class App extends Component {
    backHandler = () => {
        if (this.props.location.pathname !== '/') {
            this.props.history.goBack();
        }
    }
    detailHandler = () => {
        this.props.history.push('/my-pokemon');
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.toolbar.title !== this.props.toolbar.title;
    }

    render() {
        return (
            <div className="App">
                <Suspense fallback={<Spinner radius="5" strokeWidth="1" color="#03ac0e" />}>
                    <ToolBar total={this.props.myPokemon.length} toolbar={this.props.toolbar} backHandler={this.backHandler} detailHandler={this.detailHandler} />
                    <Switch>
                        <Route path="/my-pokemon" component={MyPokemon} />
                        <Route path="/detail" component={Detail} />
                        <Route path="/" exact component={Home} />
                    </Switch>
                </Suspense>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        toolbar: state.toolbar,
        myPokemon: state.myPokemon
    };
};

export default connect(mapStateToProps)(withRouter(App));