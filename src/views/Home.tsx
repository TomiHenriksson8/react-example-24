import {MediaItem} from '../types/DBTypes';
import MediaRow from '../components/MediaRow';
import { useEffect, useState } from 'react';
import { fetchData } from '../lib/functions';

const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);
  //console.log(mediaArray);

  const getMedia = async () => {
    try {
      const json = await fetchData<MediaItem[]>('data.json');
      setMediaArray(json);
    } catch (error) {
      console.error('Error fetching media:', error);
    }

  };

  console.log(mediaArray);

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
