import AsyncActionStateMachine from "../AsyncActionStateMachine";
import AsyncAction from "../AsyncAction";

describe("AsyncActionStateMachine", () => {
  test("Construct", () => {
    const stateMachine = new AsyncActionStateMachine();
    const action = stateMachine.getAction();
    const state = stateMachine.getStateName();

    expect(action).toBeNull();
    expect(state).toBe("ready");
  });

  test("Executing.", () => {
    const record = [];
    const stateMachine = new AsyncActionStateMachine();
    const action = new AsyncAction(() => {
      return Promise.resolve("Hello World!");
    });

    stateMachine.onStateChange((state) => {
      record.push(state);
    });

    expect(stateMachine.getStateName()).toBe("ready");

    return stateMachine.execute(action).then(() => {
      expect(record.length).toBe(2);
      expect(record[0]).toBe("pending");
      expect(record[1]).toBe("ready");
    });
  });

  test("Error.", () => {
    let error: Error | null = null;
    const record = [];
    const stateMachine = new AsyncActionStateMachine();
    const action = new AsyncAction(() => {
      return Promise.reject(new Error("Hello Error!"));
    });

    stateMachine.onStateChange((state) => {
      record.push(state);
    });

    expect(stateMachine.getStateName()).toBe("ready");

    return stateMachine
      .execute(action)
      .then(() => {})
      .catch((e) => {
        error = e;
      })
      .finally(() => {
        expect(error.message).toBe("Hello Error!");
        expect(record.length).toBe(2);
        expect(record[0]).toBe("pending");
        expect(record[1]).toBe("error");
      });
  });

  test("Resolve from error.", () => {
    let error: Error | null = null;
    const record = [];
    const stateMachine = new AsyncActionStateMachine();
    const action = new AsyncAction(() => {
      return Promise.reject(new Error("Hello Error!"));
    });

    stateMachine.onStateChange((state) => {
      record.push(state);
    });

    expect(stateMachine.getStateName()).toBe("ready");

    return stateMachine
      .execute(action)
      .then(() => {})
      .catch((e) => {
        error = e;
        stateMachine.resolveError();
      })
      .finally(() => {
        expect(error.message).toBe("Hello Error!");
        expect(record.length).toBe(3);
        expect(record[0]).toBe("pending");
        expect(record[1]).toBe("error");
        expect(record[1]).toBe("ready");
      });
  });

  test("Retry from error state.", () => {
    let error: Error | null = null;
    const record = [];
    const stateMachine = new AsyncActionStateMachine();
    let activePromise = Promise.reject<string>(new Error("Hello Error!"));
    const resolvedPromise = Promise.resolve("Hello World!");

    const action = new AsyncAction(() => {
      return activePromise;
    });

    stateMachine.onStateChange((state) => {
      record.push(state);
    });

    expect(stateMachine.getStateName()).toBe("ready");

    return stateMachine
      .execute(action)
      .then(() => {})
      .catch((e) => {
        error = e;
      })
      .finally(() => {
        expect(error.message).toBe("Hello Error!");
        expect(record.length).toBe(2);
        expect(record[0]).toBe("pending");
        expect(record[1]).toBe("error");

        activePromise = resolvedPromise;

        stateMachine.retry().then((value: string) => {
          expect(value).toBe("Hello World!");

          expect(record.length).toBe(5);
          expect(record[0]).toBe("pending");
          expect(record[1]).toBe("error");
          expect(record[2]).toBe("ready");
          expect(record[3]).toBe("pending");
          expect(record[4]).toBe("ready");
        });
      });
  });
});
