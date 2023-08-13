import { Post } from "./Post";

export interface ColumnConfig {
  label: string;
  render: (post: Post) => React.ReactNode;
  sortValue?: (post: Post) => string | number;
  header?: () => JSX.Element;
}

export interface TableProps {
  config: ColumnConfig[];
  data: Post[];
}

export interface WallContextType {
  wallData: Post[];
  fetchWallData: (accessToken: string, domain: string, countPostsOnPage: number, offset: number) => Promise<number>;
  searchOnWall: (accessToken: string, domain: string, countPostsOnPage: number, offset: number,  query: string) => Promise<number>;
}

export interface TextTruncateProps {
  text: string;
  maxLength: number;
}

export interface PaginationProps {
  totalCount: number,
  siblingCount?: number,
  currentPage: number,
  pageSize: number,
  className?: string,
  onPageChange: (page: number) => void
}

export interface usePaginationProps {
  totalCount: number,
  pageSize: number,
  siblingCount: number,
  currentPage: number
}
