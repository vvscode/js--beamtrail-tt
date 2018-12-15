import React from 'react';
import PhonesTable from '../components/PhonesTable';

const localStorage = global.localStorage || {
  getItem: () => null,
  setItem: () => null,
};

export default class IndexPage extends React.Component {
  state = {
    phones: [],
    name: '',
  };

  componentDidMount() {
    this.setState({
      name: localStorage.getItem('userName') || '',
    });
    this.fetchPhonesInfo();
  }

  fetchPhonesInfo = () =>
    fetch('/api/phones')
      .then(r => r.json())
      .then(phones =>
        this.setState({
          phones,
        }),
      );

  setName = name => {
    localStorage.setItem('userName', name);
    this.setState({ name });
  };

  bookPhone = phone => {
    fetch('/api/phone/book', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone.name,
        name: this.state.name,
      }),
    })
      .then(r =>
        r.status === 200
          ? r.json()
          : r.json().then(data => Promise.reject(data)),
      )
      .then(bookingInfo => {
        this.fetchPhonesInfo();
        alert(
          `Your booking key is: "${bookingInfo.key}"\nKeep it to return phone`,
        );
      })
      .catch(err => {
        if (err.message) {
          alert(`Error:\n${err.message}`);
        } else {
          console.error(err);
        }
      });
  };

  returnPhone = phone => {
    const key = prompt("Please enter key, you've got on booking:", '');
    fetch('/api/phone/return', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone.name,
        key,
      }),
    })
      .then(r =>
        r.status === 200
          ? r.json()
          : r.json().then(data => Promise.reject(data)),
      )
      .then(bookingInfo => this.fetchPhonesInfo())
      .catch(err => {
        if (err.message) {
          alert(`Error:\n${err.message}`);
        } else {
          console.error(err);
        }
      });
  };

  render() {
    return (
      <div>
        <h1>Phones</h1>
        <label title={this.state.name}>
          Your name:{' '}
          <input
            value={this.state.name}
            onChange={ev => this.setName(ev.target.value)}
          />
        </label>
        <PhonesTable
          phones={this.state.phones}
          bookPhone={this.bookPhone}
          returnPhone={this.returnPhone}
          userName={this.state.name}
        />
      </div>
    );
  }
}
