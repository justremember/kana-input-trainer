import { useState, useEffect, useRef } from 'react';
import useKanaState from '@/hooks/useKanaState';

export default function KanaInputTrainer() {
  const [state, dispatch, lookahead] = useKanaState();
  const [wasCorrect, setWasCorrect] = useState(true);

// Code from https://plainenglish.io/blog/how-to-create-download-and-upload-files-in-react-apps
  const [fileDownloadUrl, setFileDownloadUrl] = useState(null);
  const fileDownloadRef = useRef(null);
  const fileUploadRef = useRef(null);

  function saveState() {
    console.log('saveState');
    const output = JSON.stringify(state);
    const blob = new Blob([output]);
    const url = URL.createObjectURL(blob)
    setFileDownloadUrl(url);
  }

  function loadState() {
    fileUploadRef.current.click();
  }

  function openFile(e) {
    let status = [];
    const fileObj = e.target.files[0];
    const reader = new FileReader();
    let fileloaded = e => {
      const fileContents = e.target.result;
      const loadedState = JSON.parse(fileContents);
      console.log({fileContents});
      dispatch({ type: 'loadState', state: loadedState });
    }
    reader.onload = fileloaded;
    reader.readAsText(fileObj);
  }

  useEffect(() => {
    if (fileDownloadUrl) {
      fileDownloadRef.current.setAttribute('download', `kanaState_${new Date(Date.now()).toISOString()}.txt`);
      fileDownloadRef.current.click();
      URL.revokeObjectURL(fileDownloadUrl);
      setFileDownloadUrl(null);
    }
  }, [fileDownloadUrl]);


  function handleInputChange(e) {
    const ans = e.target.value[e.target.value.length - 1];
    if (ans === state.queue[0]) {
      console.log('dispatch correct');
      dispatch({ type: 'correct' });
      setWasCorrect(true);
    } else {
      console.log('dispatch wrong');
      dispatch({ type: 'wrong', ans });
      setWasCorrect(false);
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
      <input
        type='text'
        className={`kana-input-box form-control ${wasCorrect ? 'was-correct' : 'was-wrong'}`}
        placeholder='Type kana here'
        onChange={handleInputChange}
        maxLength='100000'
      />
      <button className='btn btn-secondary mt-2 me-2' onClick={saveState}>Save State</button>
      <button className='btn btn-secondary mt-2 me-2' onClick={loadState}>Load State</button>

      <a
        style={{display: 'none'}}
        href={fileDownloadUrl}
        ref={fileDownloadRef}
      >download it</a>

      <input
        type='file'
        style={{display: 'none'}}
        multiple={false}
        accept=".txt,.text,text/plain"
        onChange={openFile}
        ref={fileUploadRef}
      />
    </div>
  );
}
