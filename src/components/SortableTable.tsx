import { useCallback, useMemo, useState } from 'react';
import { HiChevronDown, HiChevronUp, HiChevronUpDown } from "react-icons/hi2";
import { TableProps } from '../interfaces/interfaces';
import Table from './Table';

function SortableTable({ config, data }: TableProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const handleClick = useCallback((label: string) => {
    if (sortBy && label !== sortBy) {
      setSortOrder('asc');
      setSortBy(label);
      return;
    }

    if (sortOrder === null) {
      setSortOrder('asc');
      setSortBy(label);
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
      setSortBy(label);
    } else if (sortOrder === 'desc') {
      setSortOrder(null);
      setSortBy(null);
    }
  }, [sortBy, sortOrder]);

  const updatedConfig = useMemo(() => {
    return config.map((column) => {
      if (!column.sortValue) {
        return column;
      }

      return {
        ...column,
        header: () => (
          <th
            onClick={() => handleClick(column.label)}
          >
            <div className="sorting-header">
              {getIcons(column.label, sortBy, sortOrder)}
              {column.label}
            </div>
          </th>
        ),
      };
    });
  }, [config, handleClick, sortBy, sortOrder]);

  const sortedData = useMemo(() => {
    if (!sortOrder || !sortBy) {
      return data;
    }

    const { sortValue } = config.find((column) => column.label === sortBy) || {};
    if (sortValue) {
      return [...data].sort((a, b) => {
        const valueA = sortValue(a);
        const valueB = sortValue(b);
        const reverseOrder = sortOrder === 'asc' ? 1 : -1;

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return (valueA - valueB) * reverseOrder;
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB) * reverseOrder;
        } else {
          return 0;
        }
      });
    } else {
      return data;
    }
  }, [data, config, sortBy, sortOrder]);

  return <Table data={sortedData} config={updatedConfig} />;
}

function getIcons(label: string, sortBy: string | null, sortOrder: 'asc' | 'desc' | null) {
  if (label !== sortBy || sortOrder === null) {
    return <HiChevronUpDown />;
  } else if (sortOrder === 'asc') {
    return <HiChevronUp />;
  } else {
    return <HiChevronDown />;
  }
}

export default SortableTable;
