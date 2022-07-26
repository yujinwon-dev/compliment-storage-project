/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Compliment } from '../store/modules/compliment';

export default function Card({ compliment, id } : { compliment: Compliment, id: number }) {
  const navigate = useNavigate();
  return (
    <>
      <article
        onClick={() => navigate(`/detail/${id}`)}
        css={css`
          display: inline-block;
          max-width: 800px;
          border: 1px solid #939393;
          border-radius: 10px;
          padding: 1rem;
          margin: 1rem 2rem 1rem 0;
          `}
      >
        <p
          css={css`
            white-space: pre-line;
            `}
        >{compliment.content}</p>
        <p>{compliment.date}</p>
        <p>FROM: {compliment.name}</p>
      </article>
    </>
  );
}
