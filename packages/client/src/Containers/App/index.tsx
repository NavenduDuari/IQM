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
import Questions from '../../Components/Questions/index';
import { Action } from '../../types';
import { getQuestionsAction, clearQuestionsAction } from './action';

const mapStateToProps = (globalState: GlobalStateI): MapStateToPropsI => {
  const state = globalState.appReducer;
  return {
    questions: state.questions,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (
  dispatch: (action: Action<ActionTypes>) => void
): MapDispatchToPropsI => ({
  getQuestions: (page: number) => dispatch(getQuestionsAction(page)),
  clearQuestions: () => dispatch(clearQuestionsAction()),
});

class App extends React.Component<PropsI, ComponentStateI> {
  componentDidMount() {}

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/questions"
            render={() => (
              <Questions
                questions={this.props.questions}
                isLoading={this.props.isLoading}
                getQuestions={this.props.getQuestions}
                clearQuestions={this.props.clearQuestions}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
