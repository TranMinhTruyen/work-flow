'use server';
import BackdropLoading from '@/components/loading/BackdropLoading';
import dynamic from 'next/dynamic';

const KanbanUI = dynamic(() => import('./ui'), { ssr: true, loading: () => <BackdropLoading /> });

const KanbanPage = () => {
  return <KanbanUI />;
};

export default KanbanPage;
