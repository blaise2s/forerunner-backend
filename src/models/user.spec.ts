import { expect } from 'chai';

import { setup } from '../test/setup';
import { User, UserData } from './user';

const user: UserData = {
  email: 'test@test.com',
  password: 'passw0rd'
};

describe('user model', () => {
  setup();

  it('can create a user', async () => {
    const userDoc = new User({ ...user });
    const createdUser = await userDoc.save();
    expect(createdUser).to.have.property('_id');
    const count = await User.countDocuments().then(c => c);
    expect(count).to.equal(1);
  });

  it('will not create a user with an existing email', async () => {
    const userDoc = new User({ ...user });
    const error = await userDoc.save().catch(e => e);
    expect(error.message).to.contain(
      'User validation failed: email: Error, expected `email` to be unique.'
    );
  });

  it('can find and delete a user', async () => {
    const fetchedUser = await User.findOne({ email: user.email }).then(u => u);
    expect(fetchedUser).to.not.be.null;
    expect(fetchedUser?.password).to.equal(user.password);
    const deletedUser = await User.findByIdAndDelete(fetchedUser?.id).then(
      d => d
    );
    expect(deletedUser).to.not.be.null;
    expect(deletedUser?.id).to.equal(fetchedUser?.id);
    expect(deletedUser?.email).to.equal(user.email);
    expect(deletedUser?.password).to.equal(user.password);
    const count = await User.countDocuments().then(c => c);
    expect(count).to.equal(0);
  });
});
