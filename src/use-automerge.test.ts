import { renderHook, act } from '@testing-library/react-hooks';
import { useAutomerge } from './use-automerge';
import Automerge from 'automerge';

test('sets initial value', () => {
  const expected = { foo: 'bar', baz: [1, 2, 3] };
  const { result } = renderHook(() => useAutomerge(expected));

  expect(result.current[0]).toEqual(expected);
});

test('sets initial value when passed as a function', () => {
  const expected = { foo: 'bar', baz: [1, 2, 3] };
  const { result } = renderHook(() => useAutomerge(() => expected));

  expect(result.current[0]).toEqual(expected);
});

// Not implemented yet
test.skip('sets initial value when passed an already created document', () => {
  const expected = { foo: 'bar', baz: [1, 2, 3] };
  const doc = Automerge.from(expected);
  const { result } = renderHook(() => useAutomerge(doc));

  expect(result.current[0]).toEqual(expected);
});

// Not implemented yet
test.skip('sets initial value when passed an already created document inside of a function', () => {
  const expected = { foo: 'bar', baz: [1, 2, 3] };
  const doc = Automerge.from(expected);
  const { result } = renderHook(() => useAutomerge(() => doc));

  expect(result.current[0]).toEqual(expected);
});

test('updates value', () => {
  const { result } = renderHook(() =>
    useAutomerge({ foo: 'bar', baz: [1, 2, 3] })
  );

  act(() => {
    result.current[1]((doc) => {
      doc.foo = 'changed';
    });
  });

  expect(result.current[0].foo).toEqual('changed');

  act(() => {
    result.current[1]((doc) => {
      doc.baz.pop();
    });
  });

  expect(result.current[0].baz).toEqual([1, 2]);
});
