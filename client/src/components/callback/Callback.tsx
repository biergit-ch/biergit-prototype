import * as React from 'react';
import loading from './../common/loading.svg';

export class Callback extends React.Component {
  render() {
    return (
      <div>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}
