# Process Pending Promises 🤠

This is a single file utility which helps in processing all the pending promises.

The idea is, since our code is riddled with Promises and promises do not rely on next ticks, it becomes harder to actually test the side effects caused by them.

The big idea here is to rely on async/await and Promise to resolve itself. This kind of processing allows all the previous promises to execute.

### Example:
If we don't flush the promises, this happens:
```js
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
```
The above thing is not ideal since you'd want the promise to be executed and assign the value to assertValue. This is where `process-pending-promises` comes into play. We can update the above code to something like this which works how we envision it:

```js
  import flush from 'process-pending-promises';

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
```

Also, this library will work with `setTimeout's` too since `sinon's` fake timers can fast forward the time.
