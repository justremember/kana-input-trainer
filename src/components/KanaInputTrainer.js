import useKanaState from '@/hooks/useKanaState';

export default function KanaInputTrainer() {
  const [state, dispatch, lookahead] = useKanaState();

  function handleInputChange(e) {
    const ans = e.target.value[e.target.value.length - 1];
    if (ans === state.queue[0]) {
      console.log('dispatch correct');
      dispatch({ type: 'correct' });
    } else {
      console.log('dispatch wrong');
      dispatch({ type: 'wrong', ans });
    }
  }
  return (
    <div className='kana-input-trainer'>
      <div className='kana-prompt d-flex justify-content-center align-items-center'>
        <div className='kana-ghost'>
          {'空' /* this is a placeholder so the next-question will be centered */}
        </div>
        <div className='kana-next-question'>
          { state.queue[0] }
        </div>
        <div className='kana-questions-after'>
          { state.queue.slice(1, 1 + lookahead).join('') }
        </div>
      </div>
      <input type='text' className='form-control' placeholder='Type kana here' onChange={handleInputChange} />
    </div>
  );
}
