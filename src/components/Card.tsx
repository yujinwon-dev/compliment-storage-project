/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function Card() {
  return (
    <article
      css={css`
        border: 1px solid #000;
        border-radius: 10px;
      `}
    >
      <p>내용내용내용</p>
      <p>2022.06.20</p>
      <p>FROM: XX</p>
    </article>
  );
}