/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

export default function FloatingActionButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/create')}
      css={css`
        position: fixed;
        right: 2rem;
        bottom: 2rem;
        width: 50px;
        height: 50px;
        font-size: 30px;
        border: 1px solid #939393;
        border-radius: 50%;
        cursor: pointer;
      `}
    >
      +
    </button>
  );
}