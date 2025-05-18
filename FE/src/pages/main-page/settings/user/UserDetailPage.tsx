import Stack from '@mui/material/Stack';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useForm from '@/common/hooks/useForm';
import { selectIsLogin } from '@/common/store/commonSlice';
import TextInput from '@/components/form/TextInput';
import { useAppSelector } from '@/lib/store';

import { getUserDetail } from './action';
import { IUserDetailForm } from './model/form/UserDetailForm';

const UserDetailPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { control: formControl, reset } = useForm<IUserDetailForm>();

  const isLogin = useAppSelector(selectIsLogin);

  const onGetUserDetail = useCallback(async () => {
    const response = await getUserDetail(userId, isLogin);
    reset({ ...response });
  }, [isLogin, reset, userId]);

  useEffect(() => {
    onGetUserDetail();

    return () => {
      reset();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      <form id={'user-detail-screen-form'}>
        <TextInput name={'userId'} control={formControl} />
        <TextInput name={'email'} control={formControl} />
        <TextInput name={'userName'} control={formControl} />
        <TextInput name={'fullName'} control={formControl} />
      </form>
    </Stack>
  );
};

export default UserDetailPage;
