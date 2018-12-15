import React from 'react';
import PhoneInfo from './PhoneInfo';
import './styles.css';

const PhonesTable = ({ phones }) =>
  phones.length ? (
    <table className="PhonesTable">
      <thead>
        <tr>
          <th className="PhonesTable__name">Name</th>
          <th className="PhonesTable__info">Phone Info</th>
          <th className="PhonesTable__booking">Book / Return</th>
        </tr>
      </thead>
      <tbody>
        {phones.map(phone => (
          <tr key={phone.name}>
            <td className="PhonesTable__name">{phone.name}</td>
            <td className="PhonesTable__info">
              <PhoneInfo phoneInfo={phone.phoneInfo} />
            </td>
            <td className="PhonesTable__booking">xx</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : null;

export default PhonesTable;
