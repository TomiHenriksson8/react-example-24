
import { MediaItem } from '../types/DBTypes';

interface MediaRowProps {
  mediaItem: MediaItem;
  onItemSelected: (item: MediaItem) => void; 
}

const MediaRow: React.FC<MediaRowProps> = ({ mediaItem, onItemSelected }) => {
  return (
    <tr className="media-row" onClick={() => onItemSelected(mediaItem)}>
      <td>
        <img src={mediaItem.thumbnail} alt={mediaItem.title} />
      </td>
      <td>{mediaItem.title}</td>
      <td>{mediaItem.description}</td>
      <td>{new Date(mediaItem.created_at).toLocaleString('fi-FI')}</td>
      <td>{mediaItem.filesize}</td>
      <td>{mediaItem.media_type}</td>
    </tr>
  );
};

export default MediaRow;
