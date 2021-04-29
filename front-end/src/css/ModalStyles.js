import styled from 'styled-components';

const ModalContentStyle = styled.div`
  width: 70%;
  padding: 3rem 1rem;
  background-color: white;
  text-align: center;
  .promt {
    font-size: 1.2rem;
  }
  label {
    display: block;
    margin: 1rem 0;
    span {
      display: block;
      margin-bottom: 0.5rem;
    }
  }

  button + button {
    margin-left: 1rem;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export default ModalContentStyle;
