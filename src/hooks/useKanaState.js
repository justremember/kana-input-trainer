import { useReducer } from 'react';

export const LOOKAHEAD = 1;

const allKanasInOrder = 'ろぬふあうえおやゆよわほへたていすかんなににらせむちとしはきくまのりれけつさそひこみもねるめ';
const kanasArray = allKanasInOrder.split('');

const initialState = {
  initialEase: kanasArray.reduce((o, key) => ({ ...o, [key]: 1}), {}),
  initialQueue: kanasArray
}

function initialStateToCurrState(initialState) {
  return {
    ease: initialState.initialEase,
    queue: initialState.initialQueue
  }
}

// reposition the first kana in the queue depending on its ease
function repositionKana(queue, ease) {
  const newPos = LOOKAHEAD + ease;
  const firstHalf = queue.slice(1, newPos);
  const secondHalf = queue.slice(newPos);
  return firstHalf.concat([queue[0]], secondHalf);
}

function reducer(state, action) {
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
      return newState;
    }
    default:
      console.log('unrecognized action type:', action.type);
      return state;
  }
}

export default function useKanaState() {
  const [state, dispatch] = useReducer(reducer, initialState, initialStateToCurrState);

  return [state, dispatch, LOOKAHEAD];
}
