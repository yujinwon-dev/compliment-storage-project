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
        width: 400px;
        margin: auto;
      `}
    >
      <h1
        css={css`
          line-height: 2.5;
        `}
      >칭찬 추가하기</h1>
      <form
        css={css`
          display: inline-flex;
          flex-flow: column wrap;
          width: 500px;
        `}
      >
        <label htmlFor="name">칭찬해준 사람</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          css={css`
            background: none;
            border: none;
            border-bottom: 1px solid #000;
            margin: 1rem 0;
          `}
        />
        <label htmlFor="content">내용</label>
        <div
          css={css`
            display: flex;
            justify-content: space-evenly;
            margin: 1rem 0;
          `}
        >
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.readText().then(clipText => setContent(clipText))
            }}
            css={css`
              width: fit-content;
              font-size: 1rem;
              color: #fff;
              background-color: rgba(0, 0, 0, 0.6);
              padding: 0.5rem 2rem;
              border: none;
              border-radius: 10px;
              cursor: pointer;
              :hover {
                background-color: rgba(0, 0, 0, 0.3);
              }
            `}
          >클립보드 붙여넣기</button>
          <label
            htmlFor="input-file"
            css={css`
              display: inline-block;
              width: fit-content;
              color: #fff;
              background-color: rgba(0, 0, 0, 0.6);
              padding: 0.5rem 2rem;
              border-radius: 10px;
              cursor: pointer;
              :hover {
                background-color: rgba(0, 0, 0, 0.3);
              }
              `}
          >이미지에서 텍스트 추출하기</label>
          <input
            type="file"
            name="input-file"
            id="input-file"
            onChange={e => handleImageSelection(e)}
            css={css`
                position: absolute;
                z-index: -100;
                width: 1px;
                height: 1px;
                overflow: hidden;
                opacity: 0;
            `}
          />
        </div>
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          cols={30}
          rows={15}
          css={css`
            border: 1px solid #939393;
            border-radius: 10px;
          `}
        />
        <button
          type="button"
          onClick={handleFormSubmit}
          css={css`
            width: fit-content;
            font-size: 1rem;
            padding: 0.5rem 2rem;
            border: 1px solid #939393;
            border-radius: 10px;
            margin: 1rem 0 0 auto;
            cursor: pointer;
          `}
        >추가</button>
      </form>
    </div>
  );
}
