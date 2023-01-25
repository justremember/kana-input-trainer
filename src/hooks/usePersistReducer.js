// code from https://www.benmvp.com/blog/sync-localstorage-react-usereducer-hook/
import { useEffect, useCallback, useReducer } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export default function usePersistReducer (localStorageKey, reducer, initialState) {
  const [savedState, saveState] = useLocalStorageState(
    localStorageKey,
    { defaultValue: initialState, storageSync: false },
  );

  const reducerLocalStorage = useCallback(
    (state, action) => {
      const newState = reducer(state, action)

      saveState(newState)

      return newState
    },
    [saveState, reducer],
  )

  const [newState, newDispatch] = useReducer(reducerLocalStorage, savedState)
  return [newState, newDispatch];
}
