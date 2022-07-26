/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { deleteItem } from '../store/modules/compliment';

export default function Detail() {
  const navigate = useNavigate();
  const { complimentId } = useParams();
  const complimentIdAsNum = Number(complimentId);
  const complimentList = useAppSelector(state => state.complimentList);
  const compliment = complimentList[complimentIdAsNum];
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(deleteItem(complimentIdAsNum));
    navigate('/');
  }
  return (
    <div
    >
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
        >칭찬 자세히 보기</h1>
        <p
          css={css`
            white-space: pre-line;
          `}
        >{compliment.content}</p>
        <p>{compliment.date}</p>
        <p>FROM: {compliment.name}</p>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            margin: 1rem 0;
            
            @media screen and (min-width: 768px) {
              flex-direction: row;
              justify-content: center;
            }
          `}
        >
          <button
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
                margin-right: 1rem;
              }
            `}
          >수정</button>
          <button
            onClick={() => handleDelete()}
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
            `}
          >삭제</button>
        </div>
      </div>
    </div>
  )
}
