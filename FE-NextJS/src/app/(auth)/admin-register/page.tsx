import BackdropLoading from '@/components/loading/BackdropLoading';
import dynamic from 'next/dynamic';

const AdminRegisterUI = dynamic(() => import('./ui'), {
  ssr: true,
  loading: () => <BackdropLoading />,
});

const AdminRegisterPage = async () => {
  return <AdminRegisterUI />;
};

export default AdminRegisterPage;
