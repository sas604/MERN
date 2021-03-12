import { useState } from 'react';
import styled from 'styled-components';
import { MdArrowForward } from 'react-icons/md';

const LayoutStyle = styled.div`
  display: grid;

  grid-template-columns: 50px minmax(auto, 300px) 1fr;
  grid-template-rows: minmax(100vh, auto);
  .sidebar {
    z-index: 99;
    padding-top: 2rem;
    background-color: var(--black);
    grid-column: 1/3;
    grid-row: 1;
    transform: translateX(-100%) translateX(50px);
    transition: cubic-bezier(0.39, 0.575, 0.565, 1) 0.3s;
    position: relative;
    button {
      top: 0;
      position: absolute;
      display: block;
      right: 0;
      background-color: transparent;
      color: var(--white);
      border: none;
      outline: none;
      font-size: 2rem;
      transition: all cubic-bezier(0.39, 0.575, 0.565, 1) 0.3s;
      transform-origin: center;
    }
  }
  .main {
    grid-column: 2/-1;
    grid-row: 1;
    padding: 0 0.5rem;
    padding-top: 2rem;
  }
  &.open {
    .sidebar {
      transform: translateX(0);
      button {
        transform: rotate(180deg);
        left: 0;
      }
    }
  }
`;

const Layout = ({ sidebar, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LayoutStyle className={`${open ? 'open' : 'close'}`}>
        <div className="sidebar">
          <button onClick={() => setOpen((s) => !s)} type="button">
            <MdArrowForward />
          </button>
          {sidebar}
        </div>
        <div className="main">{children}</div>
      </LayoutStyle>
    </>
  );
};
export default Layout;
