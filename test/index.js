import { action, computed, observable, useStrict } from 'mobx';
import expect from 'unexpected';
import unexpectedMobX from '../src';

expect.use(unexpectedMobX);

useStrict();

class Store {
  @observable user = null;
  @observable error = null;

  login(token) {
    setTimeout(() => {
      if (token === 'invalid') this.setError(new Error('Invalid token'));
      else this.setUser({ name: 'Felix' });
    }, 10);
  }

  @computed get loaded() {
    return this.user || this.error;
  }

  @action clearError() {
    this.error = null;
  }

  @action setError(error) {
    this.error = error;
  }

  @action setUser(user) {
    this.user = user;
  }
}

const store = new Store();

beforeEach(() => store.clearError());

it('should set error on invalid token', () =>
  expect(
    () => store.login('invalid'),
    'when observing',
    () => store.loaded && store,
    'to satisfy',
    {
      error: expect.it('to be an', 'Error'),
      user: null
    }
  ));

it('should set user on valid token', () =>
  expect(
    () => store.login('secret'),
    'when observing',
    () => store.loaded && store,
    'to satisfy',
    {
      error: null,
      user: { name: 'Felix' }
    }
  ));
