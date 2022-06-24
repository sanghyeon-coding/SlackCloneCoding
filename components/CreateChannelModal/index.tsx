import Modal from '@components/Modal';
import React, { FC, useCallback, useState } from 'react';
import { Button, Input, Label } from '@pages/SignUp/styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateChannelModal: (flag: boolean) => void;
}
const CreateChannelModal: FC<Props> = ({ show, onCloseModal, setShowCreateChannelModal }) => {
  const [newChannel, setNewChannel] = useState('');
  const onChangeNewChannel = useCallback(
    (e) => {
      setNewChannel(e.target.value);
    },
    [setNewChannel],
  );

  const { workspace } = useParams<{ workspace: string; channel: string }>();

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher); // 로그인 후 데이터를 전해줄 api (전역storage)
  const { data: channelData, mutate: mutateChannel } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );

  const onCreateChannel = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(`/api/workspaces/${workspace}/channels`, { name: newChannel })
        .then(() => {
          setShowCreateChannelModal(false);
          setNewChannel('');
          mutateChannel();
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response?.data, { position: 'top-right' });
        });
    },
    [newChannel],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="channel-label">
          <span>채널</span>
          <Input id="workspace" value={newChannel} onChange={onChangeNewChannel} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
