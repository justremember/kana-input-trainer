import { useReducer } from 'react';
// import useLocalStorageState from 'use-local-storage-state';

export const LOOKAHEAD = 1;

const allKanasInOrder = 'ちとしはきくまのりれけたていすかんなにらせむろぬふあうえおやゆよわほへつさそひこみもねるめ';
const kanasArray = allKanasInOrder.split('');
const initialPriority = kanasArray.reduce((o, key, i) => ({ ...o, [key]: i * 5}), {});

const initialState = {
  ease: kanasArray.reduce((o, key) => ({ ...o, [key]: 1}), {}),
  queue: kanasArray,
  priority: initialPriority
}

// reposition the first kana in the queue depending on its ease
function repositionKana({ queue, ease, priority }) {
  const kana = queue[0];
  priority[kana] += ease[kana] + Math.floor(Math.random() * ease[kana] / 2);
  const backlogToSort = [kana, ...queue.slice(1 + LOOKAHEAD)];
  const sortedBacklog = backlogToSort.sort((k1, k2) => priority[k1] - priority[k2]);
  return queue.slice(1, 1 + LOOKAHEAD).concat(sortedBacklog);
}

export default function useKanaState() {
  const reducer = (state, action) => {
    const prompt = state.queue[0];
    switch (action.type) {
      case 'correct': {
        const newQueue = repositionKana(state);
        const newEaseVal = state.ease[prompt] * 2;
        const newEase = { ...state.ease, [prompt]: newEaseVal };
        const newState = {
          ...state,
          ease: newEase,
          queue: newQueue
        };
        console.log({ newState });
        return newState;
      }
      case 'wrong': {
        const newEase = {
          ...state.ease,
          [prompt]: Math.max(1, Math.floor(state.ease[prompt] / 8)),
          [action.ans]: Math.max(1, Math.floor(state.ease[action.ans] / 1))
        };
        const newState = {
          ...state,
          ease: newEase,
        };
        console.log({ newState });
        return newState;
      }
      case 'loadState': {
        return {
          ...initialState,
          ...action.state
        };
      }
      default:
        console.log('unrecognized action type:', action.type);
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch, LOOKAHEAD];
}
