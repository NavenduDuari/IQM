import React, { Component } from 'react';
import './Post.scss';
import { ComponentPropsI, ComponentStateI } from './types';

class Post extends Component<ComponentPropsI, ComponentStateI> {
  constructor(props: ComponentPropsI) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <div>test</div>;
  }
}

export default Post;
