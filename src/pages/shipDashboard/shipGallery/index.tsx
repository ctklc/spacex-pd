import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Ship } from '../../../api/types';
import ShipView, { View } from '../ship';

export type ShipGalleryProps = {
  loading?: boolean;
  data?: Ship[];
  view?: View;
};

export default function ShipGallery({
  data,
  loading,
  view = View.GALLERY
}: ShipGalleryProps) {
  return (
    <Box
      maxWidth="xl"
      data-testid="ShipGalleryContainer"
      flexDirection={view === View.GALLERY ? 'row' : 'column'}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}
    >
      {loading ? (
        <CircularProgress data-testid="ShipGallerySpinner" />
      ) : (
        data?.map((item) => <ShipView key={item.id} data={item} view={view} />)
      )}
    </Box>
  );
}
