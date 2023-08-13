import { Fragment, useMemo } from 'react';
import { TableProps } from '../interfaces/interfaces';

function Table({ data, config }: TableProps) {
  const renderedHeaders = useMemo(() => {
    return config.map((column) => {
      if (column.header) {
        return <Fragment key={column.label}>{column.header()}</Fragment>;
      }

      return <th key={column.label}>{column.label}</th>;
    });
  }, [config]);

  const renderedRows = useMemo(() => {
    return data.map((rowData, rowIndex) => (
      <tr key={rowIndex}>
        {config.map((column) => (
          <td key={column.label}>
            {column.render(rowData)}
          </td>
        ))}
      </tr>
    ));
  }, [data, config]);

  return (
    <table>
      <colgroup>
        {config.map((_, index) => (
          <col className={`col-${index + 1}`} key={index} />
        ))}
      </colgroup>
      <thead>
        <tr>{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}

export default Table;
