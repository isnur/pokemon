import React, { PureComponent, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import ToolBar from './components/Toolbar/Toolbar';
import Spinner from './components/Spinner/Spinner';
import Modal from './components/Modal/Modal';

const Home = lazy(() => import('./containers/Home/Home'));
const Detail = lazy(() => import('./containers/Detail/Detail'));
const MyPokemon = lazy(() => import('./containers/MyPokemon/MyPokemon'));

export class App extends PureComponent {
  backHandler = () => {
    if (this.props.location.pathname !== '/') {
      if (this.props.history.length < 3) {
        this.props.history.push('/');
      } else {
        this.props.history.goBack();
      }
    } else {
      this.props.history.push('/');
    }
  }
  detailHandler = () => {
    this.props.history.push('/my-pokemon');
  }

  render() {
    return (
      <div className="App">
        <Suspense fallback={<Spinner radius="5" strokeWidth="1" color="#03ac0e" />}>
          <ToolBar total={this.props.myPokemon ? this.props.myPokemon.length : []} toolbar={this.props.toolbar} backHandler={this.backHandler} detailHandler={this.detailHandler} />
          <Switch>
            <Route path="/my-pokemon" component={MyPokemon} />
            <Route path="/detail" component={Detail} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Suspense>
        <Modal modal={this.props.modal} />
      </div >
    );
  }
}

export const mapStateToProps = state => {
  return {
    toolbar: state.toolbar,
    myPokemon: state.myPokemon.myPokemonList,
    modal: state.modal
  };
};

export default connect(mapStateToProps)(withRouter(App));