import styled from 'styled-components';

const ModalStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000e0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  .content {
    width: 70%;
    background-color: white;
    padding: 3rem;
  }
`;

const EmailConfirm = ({ setModal }) => (
  <ModalStyles>
    <div className="content">
      <p>Do you want to send an email to the Customer</p>
      <div className="button-group">
        <button>Send Email</button>
        <button>Don't Send Email </button>
        <button type="button" onClick={() => setModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  </ModalStyles>
);

export default EmailConfirm;
