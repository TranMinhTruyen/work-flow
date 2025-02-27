import GridTable, { GridTableProps } from './GridTable';

export type PageGridTableProps = GridTableProps & {};

const PageGridTable = (props: PageGridTableProps) => {
  const { ...restProps } = props;
  return <GridTable {...restProps} />;
};

export default PageGridTable;
