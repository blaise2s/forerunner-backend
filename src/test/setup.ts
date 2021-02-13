import { mongooseDB } from '../database';

export const setup = (
  additionalBefore = () => {},
  additionalAfter = () => {}
) => {
  before(done => {
    mongooseDB
      .connect(true)
      .then(() => {
        additionalBefore();
        done();
      })
      .catch(error => done(error));
  });

  after(done => {
    mongooseDB
      .disconnect(true)
      .then(() => {
        additionalAfter();
        done();
      })
      .catch(error => done(error));
  });
};
