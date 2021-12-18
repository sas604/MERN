import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
export const ToastContext = React.createContext();
const ToastStyle = styled.div`
  position: fixed;
  top: 3rem;
  left: 50%;
  z-index: 50;
  animation: slidein 0.5s linear 1s both;
  p {
    padding: 1.5rem 3rem;
    font-weight: 700;
    border-radius: 10px;
    line-height: 1.3;
    background-color: #cfcfcf;
    width: 300px;
    text-align: center;
  }
  .success {
    background-color: #bafaba;
    color: green;
  }
  .error {
    background-color: #ff6464;
    color: #660000;
  }
`;

const toastMotion = {
  init: {
    x: '-50%',
    y: '-130%',
  },
  in: {
    y: '-50%',
  },
  exit: { opacity: 0, y: '-100%' },
};

export default function Toast({ children }) {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    let timer1 = setTimeout(() => setMessage([]), 5000);

    return () => {
      clearTimeout(timer1);
    };
  }, [message]);
  return (
    <ToastContext.Provider
      value={{
        setMessage,
      }}
    >
      <ToastStyle>
        <AnimatePresence>
          {message.length > 0 && (
            <motion.p
              initial={toastMotion.init}
              animate={toastMotion.in}
              exit={toastMotion.exit}
              className={message[0]}
            >
              {message[1]}
            </motion.p>
          )}
        </AnimatePresence>
      </ToastStyle>

      {children}
    </ToastContext.Provider>
  );
}
