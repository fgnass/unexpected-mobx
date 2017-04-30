# MobX plugin for unexpected.js

[![Build Status](https://travis-ci.org/fgnass/unexpected-mobx.svg?branch=master)](https://travis-ci.org/fgnass/unexpected-mobx)

![unexpected mop](https://media.giphy.com/media/tSs0otW4u5QJi/giphy-downsized-large.gif)

_Image: [#unexpected #mop (via GIPHY)](https://giphy.com/gifs/unexpected-broom-mop-tSs0otW4u5QJi)_

## Assertions on effects triggered by actions


Let's start with a simple MobX store as example:

```js
class Store {

  @observable data = null;
  @observable error = null;

  @action.bound fetchData() {
    // ...
  }

  @computed get loaded() {
    return this.data || this.error;
  }
}

export default new Store();
```

Now let's assert that after invoking `fetchData` the `data`
property eventually gets set and `error` remains `null`:

```js
import expect from 'unexpected';
import unexpectedMobX from 'unexpected-mobx';

expect.use(unexpectedMobX);

expect(store.fetchData,
  'when observing',
  () => store.loaded && store,
  'to satisfy',
  {
    data: { foo: 42 },
    error: null
  }
)
```

The pattern looks like this:

`<function> when observing <function> <assertion>`

The first parameter is a function that invokes an action. If you use `@action.bound` as in the example above, you can pass the store's action method directly.

The second parameter is a reactive function that is invoked via [mobx.when](https://mobx.js.org/refguide/when.html). Once it returns a truthy value, this value will be passed on to the nested assertion.
