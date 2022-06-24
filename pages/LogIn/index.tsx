import React, { useCallback, useState } from 'react';
import { LoginPaper, Form, EmailArea, PasswordArea, Button, PaperWrap } from './styles';
import axios from 'axios';
import { LinkContainer, Error } from '@pages/SignUp/styles';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const LogIn = () => {
  const { data, mutate } = useSWR('/api/users', fetcher); // 로그인 후 데이터를 전해줄 api
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const onChangeEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail],
  );
  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoginError(false);
      axios
        .post('api/users/login', { email, password }, { withCredentials: true })
        .then(() => {
          console.log('로그인 성공');
          mutate();
        })
        .catch((error) => {
          console.log('로그인 실패');
          setLoginError(error.response?.data?.statusCode === 401);
          setLoginError(error.response.data);
        })
        .finally(() => {});
    },
    [email, mutate, password],
  );

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if (data) {
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

  return (
    <>
      <PaperWrap>
        {/*<LogoPaper>*/}
        {/*  <img src="images/loginLogo.png" alt="상상할수없는 심볼" />*/}
        {/*</LogoPaper>*/}
        <LoginPaper>
          <div>
            <h2>지출 경비 관리 시스템</h2>
            <h3>로그인 (slack)</h3>
            <Form onSubmit={onSubmit}>
              <EmailArea>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  placeholder="아이디"
                />
              </EmailArea>
              <PasswordArea>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  placeholder="비밀번호"
                />
              </PasswordArea>
              {loginError && <Error>{loginError}</Error>}
              <Button>LOGIN</Button>
            </Form>

            <LinkContainer>
              아직 회원이 아니신가요?&nbsp;
              <Link to="/signup">회원가입 하러가기</Link>
            </LinkContainer>
          </div>
        </LoginPaper>
      </PaperWrap>
    </>
  );
};

export default LogIn;
