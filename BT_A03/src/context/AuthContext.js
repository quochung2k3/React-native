import Realm from 'realm';

const AccountSchema = {
  name: 'Account',
  properties: {
    username: 'string',
    token: 'string',
  },
};

export const saveAccountInfo = (username, token) => {
  const realm = new Realm({ schema: [AccountSchema] });
  realm.write(() => {
    realm.create('Account', { username, token });
  });
};

export const getAccountInfo = () => {
  const realm = new Realm({ schema: [AccountSchema] });
  const account = realm.objects('Account');
  return account.length > 0 ? account[0] : null;
};