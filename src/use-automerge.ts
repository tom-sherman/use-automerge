import React from 'react';
import Automerge from 'automerge';

type AutomergeSetStateAction<D, T = Automerge.Proxy<D>> = {
  (message: string, callback: Automerge.ChangeFn<T>): void;
  (callback: Automerge.ChangeFn<T>): void;
};

export function useAutomerge<D = unknown>(
  initialDoc: D | (() => D)
): [Automerge.FreezeObject<D>, AutomergeSetStateAction<D>] {
  const [doc, setDoc] = React.useState(() =>
    Automerge.from<D>(
      typeof initialDoc === 'function' ? (initialDoc as Function)() : initialDoc
    )
  );

  return [
    doc,
    React.useCallback(
      ((message: any, updater: any) => {
        setDoc(Automerge.change(doc, message, updater));
      }) as AutomergeSetStateAction<D>,
      [doc]
    ),
  ];
}
