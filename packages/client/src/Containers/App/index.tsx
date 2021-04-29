/**
 * @fileinfo
 *
 * The only container for this project.
 *
 * Right now this just mount different components with different attributes
 * based on the route.
 */
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStateI } from '../../rootReducer';
import {
  PropsI,
  ComponentStateI,
  MapStateToPropsI,
  MapDispatchToPropsI,
  ActionTypes,
} from './types';
import Post from '../../Components/Post/index';
import { Action } from '../../types';

const mapStateToProps = (globalState: GlobalStateI): MapStateToPropsI => {
  const state = globalState.appReducer;
  return {};
};

const mapDispatchToProps = (
  dispatch: (action: Action<ActionTypes>) => void
): MapDispatchToPropsI => ({});

class App extends React.Component<PropsI, ComponentStateI> {
  componentDidMount() {}

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/posts" render={() => <Post />} />
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
