import { useParams } from 'react-router-dom';

const UserDetailPage = () => {
  const { userId } = useParams<{ userId: string }>();

  return <>{`This is user: ${userId} profile`}</>;
};

export default UserDetailPage;
