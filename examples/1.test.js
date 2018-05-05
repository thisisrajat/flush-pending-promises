const flush = require('../index');

describe('Test #flush', () => {
  it('updates the value when flushed', async () => {
    const promise = new Promise((resolve, reject) => {
      resolve('runs');
    });

    let assertValue = 'does not run';

    promise.then((data) => {
      assertValue = data;
    });

    await flush();

    expect(assertValue).toBe('runs');
  });

    it('does not update the value when not flushed', async () => {
    const promise = new Promise((resolve, reject) => {
      resolve('runs');
    });

    let assertValue = 'does not run';

    promise.then((data) => {
      assertValue = data;
    });

    expect(assertValue).toBe('does not run');
  });
});
