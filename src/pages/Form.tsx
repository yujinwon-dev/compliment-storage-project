/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function Form() {

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
        <input type="text" name="name" id="name" />
        <label htmlFor="content">내용</label>
        <button>클립보드 붙여넣기</button>
        <button>사진에서 텍스트 추출하기</button>
        <textarea name="content" id="content" cols={30} rows={10} />
        <button>추가</button>
      </form>
    </div>
  );
}