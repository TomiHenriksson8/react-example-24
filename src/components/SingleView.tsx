import { MediaItem } from '../types/DBTypes';

export const SingleView = (props: {mediaItem: MediaItem}) => {
  const { mediaItem } = props;
  if (!mediaItem) return null;

  return (
    <div>
      <h2>{mediaItem.title}</h2>
      <p>{mediaItem.description}</p>
    </div>
  )
}
