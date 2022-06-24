import styled from '@emotion/styled';

export const PaperWrap = styled.div`
  display: flex;
`;

export const LogoPaper = styled.div`
  width: 60vw;
  height: 100vh;
  background-color: #303030;
  position: relative;

  > img {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const LoginPaper = styled.div`
  width: 40vw;
  height: 100vh;
  position: relative;

  > div {
    width: 361px;
    height: 577px;
    padding: 65px 25px 0 25px;
    background-color: #fff;
    box-shadow: 6px 8px 16px rgba(0, 0, 0, 0.45);

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  > h2 {
    font-family: Pretendard, sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin: 0;
  }
  > h3 {
    font-size: 17px;
    font-weight: 700;
    padding: 32px 0 50px 0;
    margin: 0;
  }
`;

export const Form = styled.form`
  width: 100%;
`;

export const EmailArea = styled.div`
  width: 100%;
  height: 38px;
  margin-bottom: 12px;

  > input {
    width: 100%;
    height: 100%;
    border: none;
    border-bottom: 1px solid #7b7b7b;
    text-indent: 8px;
    ::placeholder {
      color: #7b7b7b;
      font-size: 11px;
      text-indent: 8px;
    }
    &:focus {
      outline: none;
    }
  }
`;

export const PasswordArea = styled.div`
  width: 100%;
  height: 38px;
  margin-bottom: 34px;

  > input {
    width: 100%;
    height: 100%;
    border: none;
    border-bottom: 1px solid #7b7b7b;
    text-indent: 8px;
    ::placeholder {
      color: #7b7b7b;
      font-size: 11px;
      text-indent: 8px;
    }
    &:focus {
      outline: none;
    }
  }
`;

export const Button = styled.button`
  display: block;
  width: 198px;
  height: 44px;
  border-radius: 21px;
  border: none;
  background-color: #f80879;

  font-size: 13px;
  color: #fff;

  cursor: pointer;
  margin: 0 auto;
`;
