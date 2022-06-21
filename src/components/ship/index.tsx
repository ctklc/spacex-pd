import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { Ship } from '../../api/types';

export type ShipProps = {
  data: Ship;
  view?: View;
};

export enum View {
  LIST,
  GALLERY
}

function ShipView({
  data: { image, name, type },
  view = View.GALLERY
}: ShipProps) {
  return (
    <Box
      flexDirection={view === View.GALLERY ? 'column' : 'row'}
      borderBottom={view === View.GALLERY ? 1 : 0}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
        gap: 2
      }}
    >
      <img
        width={240}
        height={200}
        alt={name}
        src={image}
        srcSet={image}
        loading="lazy"
      />
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          gap: 2,
          mb: 1
        }}
      >
        <Typography variant="body1">{name}</Typography>
        <Typography variant="body2">{type}</Typography>
      </Box>
    </Box>
  );
}

export default memo(ShipView);
