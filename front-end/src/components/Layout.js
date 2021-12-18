import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdArrowForward } from 'react-icons/md';
import { useLocation, useRouteMatch } from 'react-router';

const LayoutStyle = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: minmax(auto, 300px) 1fr;
  grid-template-rows: minmax(100vh, auto);
  .nav-btn {
    appearance: none;
    top: 0;
    position: absolute;
    display: block;
    left: 0;
    z-index: 100;
    background-color: transparent;
    color: var(--black);
    border: none;
    outline: none;
    font-size: 2rem;
    transition: all cubic-bezier(0.39, 0.575, 0.565, 1) 0.3s;
    padding: 0;
    display: inline-flex;
    cursor: pointer;
  }
  .sidebar {
    z-index: 99;
    padding-top: 2rem;
    background-color: var(--black);
    grid-column: 1/2;
    grid-row: 1;
    transform: translateX(-100%);
    transition: cubic-bezier(0.39, 0.575, 0.565, 1) 0.3s;
    position: relative;
  }
  .main {
    grid-column: 1/-1;
    grid-row: 1;
    padding: 3rem 0.5rem;
    & > span {
      text-align: left;
      position: absolute;
      right: 0;
      top: 0;
      opacity: 0.5;
    }
  }
  &.open {
    .sidebar {
      transform: translateX(0);
    }
    .nav-btn {
      transform: rotate(180deg);
      left: 0;
      color: var(--white);
    }
  }
`;

const Layout = ({ sidebar, children }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [location.key]);

  return (
    <>
      <LayoutStyle className={`${open ? 'open' : 'close'}`}>
        <div className="sidebar">{sidebar}</div>
        <div className="main">
          <span style={{ textAlign: 'left' }}>V0.0.5</span>
          <button
            className="nav-btn"
            onClick={() => setOpen((s) => !s)}
            type="button"
          >
            <MdArrowForward />
          </button>
          {children}
        </div>
      </LayoutStyle>
    </>
  );
};
export default Layout;
