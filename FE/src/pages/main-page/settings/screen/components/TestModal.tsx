import Typography from '@mui/material/Typography';
import { memo, useCallback, useMemo, useRef } from 'react';

import { CommonElement } from '@/common/constants/typeConst';
import { ModalRef } from '@/common/hooks/types/useModalTypes';
import useScreenComponent from '@/common/hooks/useScreenComponent';
import Button from '@/components/button/Button';
import DemoModal, { Item, TestInputValue } from '@/components/modal/DemoModal';

const TestModal = () => {
  const { createByAuthorizer } = useScreenComponent();

  const modalRef = useRef<ModalRef<Item, TestInputValue>>(null);

  const handleOpenModal = useCallback(async () => {
    if (modalRef.current) {
      const result = await modalRef.current.open({
        inputValue: {
          value1: 'Input value 1',
          value2: 'Input value 2',
        },
      });
    }
  }, []);

  const demoModal: CommonElement = useMemo(() => {
    return createByAuthorizer(
      {
        role: 'ADMIN',
        level: 3,
      },
      <>
        <Button
          width={200}
          label={
            <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
              {'Test open modal'}
            </Typography>
          }
          onClick={handleOpenModal}
        />
        <DemoModal ref={modalRef} />
      </>
    );
  }, [createByAuthorizer, handleOpenModal]);

  return <>{demoModal}</>;
};

export default memo(TestModal);
