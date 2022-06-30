/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Compliment } from '../store/modules/compliment';

export default function Card({ compliment } : { compliment: Compliment }) {
  return (
    <article
      css={css`
        border: 1px solid #000;
        border-radius: 10px;
      `}
    >
      <p>{compliment.content}</p>
      <p>2022.06.20</p>
      <p>FROM: {compliment.name}</p>
    </article>
  );
}