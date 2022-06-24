import Modal from '@components/Modal';
import React, { FC, useCallback, useState } from 'react';
import { Button, Input, Label } from '@pages/SignUp/styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteWorkspaceModal: (flag: boolean) => void;
}
const InviteWorkspaceModal: FC<Props> = ({ show, onCloseModal, setShowInviteWorkspaceModal }) => {
  const [newMember, setNewMember] = useState('');
  const onChangeNewMember = useCallback(
    (e) => {
      setNewMember(e.target.value);
    },
    [setNewMember],
  );
  const { workspace } = useParams<{ workspace: string }>();
  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher); // 로그인 후 데이터를 전해줄 api (전역storage)
  const { mutate: mutateMembers } = useSWR<IUser[]>(userData ? `/api/workspaces/${workspace}/members` : null, fetcher);

  const onInviteMember = useCallback(
    (e) => {
      e.preventDefault();

      if (!newMember || !newMember.trim()) {
        return;
      }

      axios
        .post(`/api/workspaces/${workspace}/members`, { email: newMember })
        .then(() => {
          mutateMembers();
          setShowInviteWorkspaceModal(false);
          setNewMember('');
          console.log('메일이 전송되었습니다.');
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response?.data, { position: 'top-right' });
        });
    },
    [mutateMembers, newMember, setShowInviteWorkspaceModal, workspace],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>이메일</span>
          <Input id="member" type="email" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
