'use server';
import BackdropLoading from '@/components/loading/BackdropLoading';
import dynamic from 'next/dynamic';

const LoginUI = dynamic(() => import('./ui'), { ssr: true, loading: () => <BackdropLoading /> });

const LoginPage = () => {
  return <LoginUI />;
};

export default LoginPage;
