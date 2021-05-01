import React, { Component } from 'react';
import './Questions.scss';
import {
  CalendarOutlined,
  UserOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { ComponentPropsI, ComponentStateI } from './types';
import { IsQuestionLoading, QuestionI } from '../../types';

const getQuestionContent = (question: QuestionI) => (
  <>
    <div className="title">{question.title}</div>
    <div className="owner-n-date">
      <div className="owner">
        <UserOutlined />
        {question.owner.display_name}
      </div>
      <div className="creation-date">
        <CalendarOutlined />
        {new Date(question.creation_date * 1000).toLocaleDateString()}
      </div>
    </div>
  </>
);

class Questions extends Component<ComponentPropsI, ComponentStateI> {
  lastQuestionRef: React.RefObject<HTMLDivElement>;

  observer: IntersectionObserver;

  constructor(props: ComponentPropsI) {
    super(props);
    this.state = {
      openQuestionIdx: -1,
      currentPageNo: 1,
    };

    this.lastQuestionRef = React.createRef<HTMLDivElement>();

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver(this.handleObserver, options);
  }

  componentDidMount() {
    this.props.getQuestions(this.state.currentPageNo);
  }

  componentDidUpdate() {
    if (this.lastQuestionRef.current) {
      this.observer.disconnect();
      this.observer.observe(this.lastQuestionRef.current as Element);
    }
  }

  componentWillUnmount() {
    this.props.clearQuestions();
  }

  handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (this.props.isLoading !== IsQuestionLoading.NotLoading) return;

    if (entries[0]) {
      if (entries[0].isIntersecting) {
        this.setState((prevState) => ({
          currentPageNo: prevState.currentPageNo + 1,
        }));
        this.props.getQuestions(this.state.currentPageNo);
      }
    }
  };

  render() {
    const { questions, isLoading } = this.props;
    const { openQuestionIdx } = this.state;

    return (
      <div className="questions-container">
        {questions.map((question: QuestionI, idx: number) => {
          if (idx === questions.length - 1) {
            return (
              <div
                ref={this.lastQuestionRef}
                key={`${question.question_id}|${question.owner.user_id}`}
                className="unit-question"
                onClick={() => this.setState({ openQuestionIdx: idx })}
              >
                {getQuestionContent(question)}
              </div>
            );
          }
          return (
            <div
              key={`${question.question_id}|${question.owner.user_id}`}
              className="unit-question"
              onClick={() => this.setState({ openQuestionIdx: idx })}
            >
              {getQuestionContent(question)}
            </div>
          );
        })}

        {(isLoading === IsQuestionLoading.Loading || true) && (
          <div className="loader">
            <div style={{ height: '50px', width: '50px' }} />
          </div>
        )}

        {openQuestionIdx !== -1 && (
          <div
            className="modal-mask"
            onClick={() => this.setState({ openQuestionIdx: -1 })}
          >
            <div
              className="modal-body"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="title">{questions[openQuestionIdx].title}</div>
              <div
                className="body"
                dangerouslySetInnerHTML={{
                  __html: questions[openQuestionIdx].body,
                }}
              />
              <a className="link" href={questions[openQuestionIdx].link}>
                <LinkOutlined />
                View on Stackoverflow
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Questions;
