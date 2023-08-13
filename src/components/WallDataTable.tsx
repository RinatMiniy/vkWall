import SortableTable from './SortableTable';
import useWallContext from '../hooks/use-wall-context';
import { Post } from '../interfaces/Post';
import TextTruncate from './TextTruncate';

function WallDataTable() {
  const { wallData } = useWallContext()

  const config = [
    {
      label: 'Link',
      render: (post: Post) => <a target="_blank" href={`https://vk.com/wall${post.owner_id}_${post.id}`}>link</a>,
    },
    {
      label: 'Text',
      render: (post: Post) => <TextTruncate text = {post.text}  maxLength = {500}/>,
    },
    {
      label: 'Date',
      render: (post: Post) => {
        const date = new Date(post.date * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
      },
      sortValue: (post: Post) => post.date,
    },
    {
      label: 'Views',
      render: (post: Post) => post.views?.count,
      sortValue: (post: Post) => post.views?.count,
    },
    {
      label: 'Likes',
      render: (post: Post) => post.likes.count,
      sortValue: (post: Post) => post.likes.count,
    },
    {
      label: 'Repost',
      render: (post: Post) => post.reposts.count,
      sortValue: (post: Post) => post.reposts.count,
    },
  ];

  return (
    <SortableTable data={wallData} config={config}/>
  );
}

export default WallDataTable;
