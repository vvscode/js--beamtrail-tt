const React = require('react');

export default class IndexPage extends React.Component {
  state = {
    phones: [],
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
        <h1>Page</h1>
        <pre>{JSON.stringify(this.state.phones)}</pre>
      </div>
    );
  }
}
