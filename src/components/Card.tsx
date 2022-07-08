/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Compliment } from '../store/modules/compliment';

export default function Card({ compliment } : { compliment: Compliment }) {
  return (
    <article
      css={css`
        display: inline-block;
        max-width: 550px;
        border: 1px solid #939393;
        border-radius: 10px;
        padding: 1rem;
        margin: 1rem 2rem 1rem 0;
      `}
    >
      <p>{compliment.content}</p>
      <p>2022.06.20</p>
      <p>FROM: {compliment.name}</p>
    </article>
  );
}