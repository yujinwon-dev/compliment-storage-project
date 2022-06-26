/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

export default function FloatingActionButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/create')}
      css={css`
        position: absolute;
        right: 2rem;
        bottom: 2rem;
        width: 50px;
        height: 50px;
        font-size: 30px;
        border: 1px solid #000;
        border-radius: 50%;
        cursor: pointer;
      `}
    >
      +
    </button>
  );
}