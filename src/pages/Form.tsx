import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { ComplimentWithId, addItem, updateItem } from '../store/modules/compliment';

export default function Form() {
  const navigate = useNavigate();
  const location = useLocation();
  const [nameInput, setNameInput] = useState<string>('');
  const [contentInput, setContentInput] = useState<string>('');
  const [dateInput, setDateInput] = useState<string>('');
  const [complimentId, setComplimentId] = useState<number>(0);
  const [isForUpdate, setIsForUpdate] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (location.state) {
      const { name, content, date, id } = location.state as ComplimentWithId;
      setNameInput(name);
      setContentInput(content);
      setDateInput(date);
      setComplimentId(id);
      setIsForUpdate(true);
    }
  }, [location.state]);

  function handleImageSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (files) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = function() {
        // TODO: png 파일 처리
        const result = reader.result as string;
        const text = result.split(',')[1];
        handleTextDetection(text.startsWith('/9j/') ? text : `/9j/${text}`);
      }
    }
  }

  function handleTextDetection(selectedFile: string) {
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${import.meta.env.REACT_APP_GOOGLE_API_KEY}`;
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
        const text = data.responses[0].fullTextAnnotation.text;
        setContentInput(text.replaceAll('\n', ''));
      })
      .catch(() => alert('텍스트를 추출할 수 없는 이미지입니다.'));
  }

  function handleFormSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (nameInput.length === 0 || contentInput.length === 0) {
      alert('입력하지 않은 항목이 있습니다.');
      return;
    }
    if (!isForUpdate) {
      dispatch(addItem({ name: nameInput, content: contentInput, date: dateInput }));
      navigate('/');
    } else {
      dispatch(updateItem({ name: nameInput, content: contentInput, date: dateInput, id: complimentId }));
      navigate(`/${complimentId}`);
    }
  }

  return (
    <div
      css={css`
        max-width: 500px;
        margin: auto;
      `}
    >
      <h1
        css={css`
          line-height: 2.5;
        `}
      >칭찬 추가하기</h1>
      <form
        onSubmit={handleFormSubmit}
        css={css`
          display: flex;
          flex-flow: column wrap;
          width: 100%;
        `}
      >
        <label htmlFor="name">칭찬해준 사람</label>
        <input
          type="text"
          name="name"
          id="name"
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
          required
          css={css`
            background: none;
            border: none;
            border-bottom: 1px solid #000;
            margin: 1rem 0;
          `}
        />
        <label htmlFor="date">칭찬받은 날짜</label>
        <input
          type="date"
          name="date"
          id="date"
          value={dateInput}
          onChange={e => setDateInput(e.target.value)}
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
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            margin: 1rem 0 1.5rem;
            
            @media screen and (min-width: 768px) {
              flex-direction: row;
            }
          `}
        >
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.readText().then(clipText => setContentInput(clipText))
            }}
            css={css`
              width: fit-content;
              font-size: 1rem;
              color: #fff;
              background-color: rgba(0, 0, 0, 0.6);
              padding: 0.5rem 2rem;
              border: none;
              border-radius: 10px;
              margin-bottom: 0.5rem;
              cursor: pointer;
              :hover {
                background-color: rgba(0, 0, 0, 0.3);
              }

              @media screen and (min-width: 768px) {
                margin-bottom: 0;
              }
            `}
          >클립보드 붙여넣기</button>
          <div
            css={css`
              display: flex;
              flex-flow: column wrap;
              position: relative;
            `}
          >
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
            <small
              css={css`
                width: fit-content;
                position: absolute;
                top: 40px;
                left: 50%;
                transform: translateX(-50%);
              `}
            >.jpeg 형식만 지원합니다.</small>
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
        </div>
        <textarea
          name="content"
          id="content"
          value={contentInput}
          onChange={e => setContentInput(e.target.value)}
          cols={30}
          rows={15}
          required
          css={css`
            border: 1px solid #939393;
            border-radius: 10px;
          `}
        />
        <button
          type="submit"
          css={css`
            width: fit-content;
            font-size: 1rem;
            padding: 0.5rem 2rem;
            border: 1px solid #939393;
            border-radius: 10px;
            margin: 1rem 0 0 auto;
            cursor: pointer;
            :hover {
              background-color: #E3CEF9;
              border: 1px solid #E3CEF9;
            }
          `}
        >추가</button>
      </form>
    </div>
  );
}
