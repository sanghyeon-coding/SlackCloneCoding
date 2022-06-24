import React, { VFC, useCallback, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect, Route, Switch, Link, useParams } from 'react-router-dom';
import {
  Header,
  ProfileImg,
  RightMenu,
  Workspaces,
  WorkspaceWrapper,
  Channels,
  Chats,
  WorkspaceName,
  MenuScroll,
  ProfileModal,
  LogOutButton,
  WorkspaceButton,
  AddButton,
  WorkspaceModal,
} from '@layouts/Workspace/styles';
import { Button, Input, Label } from '@pages/SignUp/styles';
import gravatar from 'gravatar';
import loadable from '@loadable/component';
import Menu from '@components/Menu';
import Modal from '@components/Modal';
import { IChannel, IUser } from '@typings/db';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateChannelModal from '@components/CreateChannelModal';
import InviteWorkspaceModal from '@components/InviteWorkspaceModal';
import InviteChannelModal from '@components/InviteChannelModal';
// import ChannelList from '@components/ChannelList';
// import DMList from '@components/DMList';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: VFC = () => {
  const { workspace } = useParams<{ workspace?: string }>();
  const { data: userData, mutate } = useSWR<IUser | false>('/api/users', fetcher); // 로그인 후 데이터를 전해줄 api (전역storage)
  const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);
  const { data: memberData } = useSWR<IUser[]>(userData ? `/api/workspaces/${workspace}/members` : null, fetcher);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const onChangeNewWorkspace = useCallback((e) => {
    setNewWorkspace(e.target.value);
  }, []);
  const onChangeNewUrl = useCallback((e) => {
    setNewUrl(e.target.value);
  }, []);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3090/api/users/logout', null, {
        withCredentials: true, // 쿠키공유
      })
      .then(() => {
        mutate();
      });
  }, [mutate]);

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const onCreateWorkspace = useCallback(
    (e) => {
      // form 에서 submit 할 때 확인사항
      e.preventDefault();
      if (!newWorkspace || !newWorkspace.trim()) return; // .trim() : 띄어쓰기 막음
      if (!newUrl || !newUrl.trim()) return;
      // =============================

      axios
        .post('/api/workspaces', { workspace: newWorkspace, url: newUrl })
        .then((data) => {
          mutate();
          setShowCreateWorkspaceModal(false);
          setNewWorkspace('');
          setNewUrl('');
          toast.success(`워크스페이스 ${data.data.name} 생성완료`, { position: 'top-right' });
        })
        .catch((error) => {
          console.log('에러가 발생했습니다', error);
          toast.error(error.response?.data, { position: 'top-right' });
        });
    },
    [newWorkspace, newUrl, mutate],
  );

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
    setShowInviteChannelModal(false);
  }, []);

  const toggleWorkspaceModal = useCallback(() => {
    // alert('알리임');
    setShowWorkspaceModal((prev) => !prev);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  if (!userData) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(userData.nickname, { s: '28px', d: 'retro' })} alt={userData.nickname} />
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })} alt={userData.nickname} />
                  <div>
                    <span id="profile-name">{userData.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>

      <WorkspaceWrapper>
        <Workspaces>
          {userData?.Workspaces.map((ws) => {
            return (
              <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
              </Link>
            );
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>Sleact</WorkspaceName>
          <MenuScroll>
            <Menu onCloseModal={toggleWorkspaceModal} style={{ top: 95, left: 80 }} show={showWorkspaceModal}>
              <WorkspaceModal>
                <h2>Sleact</h2>
                <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button onClick={onLogout}>로그아웃</button>
              </WorkspaceModal>
            </Menu>
            {/*<ChannelList />*/}
            {/*<DMList />*/}
            {channelData?.map((v) => (
              <div key={v.id}>{v.name}</div>
            ))}
          </MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path="/workspace/:workspace/channel/:channel" component={Channel} />
            <Route path="/workspace/:workspace/dm/:id" component={DirectMessage} />
          </Switch>
        </Chats>
      </WorkspaceWrapper>

      {/*<Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>*/}
      {/*  얍*/}
      {/*</Modal>*/}

      <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWorkspace}>
          <Label id="workspace-label">
            <span>워크스페이스 이름</span>
            <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
          </Label>
          <Label id="workspace-url-label">
            <span>워크스페이스 url</span>
            <Input id="workspace" value={newUrl} onChange={onChangeNewUrl} />
          </Label>
          <Button type="submit">생성하기</Button>
        </form>
      </Modal>

      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateChannelModal={setShowCreateChannelModal}
      />

      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />

      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />

      <ToastContainer />
    </div>
  );
};

export default Workspace;
