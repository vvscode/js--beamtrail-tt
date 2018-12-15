import React from 'react';

const PhoneInfo = ({ phoneInfo = {} }) => {
  if (!phoneInfo || Object.keys(phoneInfo) === 0) {
    return null;
  }
  return (
    <ul>
      {phoneInfo.technology ? (
        <li title="technology" key="technology">
          {phoneInfo.technology}
        </li>
      ) : null}
      {phoneInfo['2gBands'] ? (
        <li title="2g bands" key="2g bands">
          {phoneInfo['2gBands']}
        </li>
      ) : null}
      {phoneInfo['3gBands'] ? (
        <li title="3g bands" key="3g bands">
          {phoneInfo['3gBands']}
        </li>
      ) : null}
      {phoneInfo['4gBands'] ? (
        <li title="4g bands" key="4g bands">
          {phoneInfo['4gBands']}
        </li>
      ) : null}
    </ul>
  );
};

export default PhoneInfo;
