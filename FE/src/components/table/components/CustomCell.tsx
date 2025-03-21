import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ColDef } from 'ag-grid-community';
import { useEffect, useRef, useState } from 'react';

const CellRenderer = (params: { value: any; colDef: ColDef }) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (cellRef.current) {
      setIsOverflow(cellRef.current.scrollWidth > cellRef.current.clientWidth);
    }
  }, [params.value, params.colDef.width]);

  const typographyContent = (
    <Typography
      ref={cellRef}
      sx={{
        maxWidth: params.colDef.width ?? '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {params.value}
    </Typography>
  );

  return isOverflow ? (
    <Tooltip title={params.value || ''} arrow>
      {typographyContent}
    </Tooltip>
  ) : (
    typographyContent
  );
};

export default CellRenderer;
