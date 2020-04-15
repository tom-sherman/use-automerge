# use-automerge

A hook manage state using [automerge](https://github.com/automerge/automerge) in a React hook.

## API

### `useAutomerge`

`useAutomerge(initialState)` is similar to [React.useState](https://reactjs.org/docs/hooks-state.html). The function returns a tuple, the first value of the tuple is the current state, the second is the updater function, which accepts an Automerge change function where the draft document can be mutated freely.

```javascript
import React from 'react';
import { useAutomerge } from 'use-automerge';

function App() {
  const [doc, updateDoc] = useAutomerge({
    name: 'Michel',
    age: 33,
  });

  function updateName(name) {
    updateDoc((draft) => {
      draft.name = name;
    });
  }

  function becomeOlder() {
    updateDoc((draft) => {
      draft.age++;
    });
  }

  return (
    <div className="App">
      <h1>
        Hello {person.name} ({person.age})
      </h1>
      <input
        onChange={(e) => {
          updateName(e.target.value);
        }}
        value={person.name}
      />
      <br />
      <button onClick={becomeOlder}>Older</button>
    </div>
  );
}
```

## Prior art

This project was heavily inspired by [user-immer](https://github.com/immerjs/use-immer).
