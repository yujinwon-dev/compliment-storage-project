/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { add } from '../store/modules/compliment';

export default function Form() {
  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleImageSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (files) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = function() {
      // TODO: png일 경우 jpg로 변환
        const result = reader.result as string;
        const text = result.split(',')[1];
        handleTextDetection(text.startsWith('/9j/') ? text : `/9j/${text}`);
      }
    }
  }

  function handleTextDetection(selectedFile: string) {
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    const payload = {
      requests: [
        {
          image: {
              content: selectedFile,
          },
          features: [{
              type: 'TEXT_DETECTION',
          }],
          imageContext: {
            languageHints: ["ko"],
          },
        }
      ]
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        const text = data.responses[0].fullTextAnnotation.text
        setContent(text.replaceAll('\n', ''))
      })
  }

  function handleFormSubmit() {
    dispatch(add({name, content}));
    navigate('/');
  }

  return (
    <div
      css={css`
        margin: auto 0;
      `}
    >
      <h1>칭찬 추가하기</h1>
      <form
        css={css`
          display: inline-flex;
          flex-flow: column wrap;
          width: 50%;
        `}
      >
        <label htmlFor="name">칭찬해준 사람</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="content">내용</label>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.readText().then(clipText => setContent(clipText))
          }}
        >클립보드 붙여넣기</button>
        <input
          type="file"
          name="input-file"
          id="input-file"
          onChange={e => handleImageSelection(e)}
        />
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          cols={30}
          rows={10}
        />
        <button type="button" onClick={handleFormSubmit}>추가</button>
      </form>
    </div>
  );
}
