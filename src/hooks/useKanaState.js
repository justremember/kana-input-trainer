import { useReducer } from 'react';
// import useLocalStorageState from 'use-local-storage-state';

export const LOOKAHEAD = 1;

const allKanasInOrder = 'ちとしはきくまのりれけたていすかんなにらせむろぬふあうえおやゆよわほへつさそひこみもねるめ';
const kanasArray = allKanasInOrder.split('');

const initialState = {
  ease: kanasArray.reduce((o, key) => ({ ...o, [key]: 1}), {}),
  queue: kanasArray
}

// reposition the first kana in the queue depending on its ease
function repositionKana(queue, ease) {
  let newPos;
  if (ease < queue.length * 3/4) {
	newPos = LOOKAHEAD + ease + Math.floor(Math.random() * 2);
  } else {
	// place kana in a random position in the 2nd half of the queue
	newPos = LOOKAHEAD + Math.ceil(queue.length/2) + Math.floor(Math.random() * (queue.length/2 - LOOKAHEAD));
  }
  console.log(newPos);
  const firstHalf = queue.slice(1, newPos);
  const secondHalf = queue.slice(newPos);
  return firstHalf.concat([queue[0]], secondHalf);
}

export default function useKanaState() {
  const reducer = (state, action) => {
    const prompt = state.queue[0];
    switch (action.type) {
      case 'correct': {
        const newQueue = repositionKana(state.queue, state.ease[prompt]);
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
        const newPromptEaseVal = Math.max(1, Math.floor(state.ease[prompt] / 4));
        const newWrongAnsEaseVal = Math.max(1, Math.floor(state.ease[action.ans] / 4));
        const newEase = { ...state.ease, [prompt]: newPromptEaseVal, [action.ans]: newWrongAnsEaseVal };
        const newState = {
          ...state,
          ease: newEase,
        };
        console.log({ newState });
        return newState;
      }
      case 'loadState': {
        return action.state;
      }
      default:
        console.log('unrecognized action type:', action.type);
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch, LOOKAHEAD];
}
/*
export default function useKanaState() {
  const [savedState, saveState] = useLocalStorageState(
    'kanaState',
    { defaultValue: initialState },
  );

  const reducer = (state, action) => {
    const prompt = state.queue[0];
    switch (action.type) {
      case 'correct': {
        const newEaseVal = state.ease[prompt] * 2;
        const newEase = { ...state.ease, [prompt]: newEaseVal };
        const newState = {
          ...state,
          ease: newEase,
          queue: repositionKana(state.queue, newEase[prompt])
        };
        console.log({ newState });
        saveState(newState);
        return newState;
      }
      case 'wrong': {
        const newPromptEaseVal = Math.max(1, Math.floor(state.ease[prompt] / 2));
        const newWrongAnsEaseVal = Math.max(1, Math.floor(state.ease[action.ans] / 2));
        const newEase = { ...state.ease, [prompt]: newPromptEaseVal, [action.ans]: newWrongAnsEaseVal };
        const newState = {
          ...state,
          ease: newEase,
        };
        console.log({ newState });
        saveState(newState);
        return newState;
      }
      default:
        console.log('unrecognized action type:', action.type);
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, savedState);

  return [state, dispatch, LOOKAHEAD];
}
  */
