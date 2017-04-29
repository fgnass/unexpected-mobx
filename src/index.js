import { when } from 'mobx';

const plugin = {
  name: 'unexpected-mobx',
  installInto(expect) {
    expect.addAssertion(
      '<function> when observing <function> <assertion>',
      (expect, action, predicate) => {
        expect.errorMode = 'nested';
        return (
          expect
            // eslint-disable-next-line no-unused-vars
            .promise((resolve, reject) => {
              when(predicate, () => {
                const res = predicate();
                resolve(res);
              });
              action();
            })
            .then(predicateResult => {
              return expect.shift(predicateResult);
            })
        );
      }
    );
  }
};

export default plugin;
