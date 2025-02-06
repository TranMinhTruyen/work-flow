'use client';
import { CURRENT_PATH } from '@/common/constants/commonConst';
import { usePathname } from 'next/navigation';
import { memo, useEffect } from 'react';
import Board from './components/Board';
import { initData } from './services/action';

const KanbanV2Page = () => {
  const path = usePathname();

  useEffect(() => {
    sessionStorage.setItem(CURRENT_PATH, path);
    initData();
  }, [path]);

  return <Board />;
};

export default memo(KanbanV2Page);
