export default function KanaInputTrainer() {
  return (
    <div className='kana-input-trainer'>
      <div className='kana-prompt d-flex justify-content-center align-items-center'>
        <div className='kana-ghost'>
          {'空気' /* this is a placeholder so the next-question will be centered */}
        </div>
        <div className='kana-next-question'>
          ろ
        </div>
        <div className='kana-questions-after'>
          ふあ
        </div>
      </div>
      <input type='text' className='form-control' placeholder='Type kana here' />
    </div>
  );
}
