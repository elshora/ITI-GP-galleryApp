import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArtists } from '../../features/artist/artistSlice';
import Artist from './Artist';

const ArtistsComp = () => {
  const { artists } = useSelector((state) => state.artist);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArtists());
  }, []);

  return (
    <section>
      <div className="container">
        <h2 className="text-black-50 text-center my-4"> Our Artists</h2>
        <div className="row row-cols-md-3 row-cols-1 row-cols-sm-2">
          {artists?.map((artist) => (
            <Artist data={artist} key={artist._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistsComp;
