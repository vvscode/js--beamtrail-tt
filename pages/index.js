import React from 'react';
import PhonesTable from '../components/PhonesTable';

export default class IndexPage extends React.Component {
  state = {
    phones: [],
    name: '',
  };

  componentDidMount() {
    fetch('/api/phones')
      .then(r => r.json())
      .then(phones =>
        this.setState({
          phones,
        }),
      );
  }
  render() {
    return (
      <div>
        <h1>Phones</h1>
        <PhonesTable phones={this.state.phones} />
      </div>
    );
  }
}
