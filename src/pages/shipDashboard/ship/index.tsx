import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { Ship } from '../../../api/types';

export type ShipProps = {
  data: Ship;
  view?: View;
};

export enum View {
  LIST,
  GALLERY
}

type FlexDirection = 'column' | 'row';

function ShipView({
  data: { image, name, type },
  view = View.GALLERY
}: ShipProps) {
  const { flexDirection, borderBottom, width } =
    view === View.GALLERY
      ? {
          flexDirection: 'column',
          borderBottom: 1,
          width: 240
        }
      : {
          flexDirection: 'row',
          borderBottom: 0,
          width: 360
        };

  return (
    <Box
      flexDirection={flexDirection as FlexDirection}
      borderBottom={borderBottom}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
        gap: 2
      }}
    >
      <img
        width={width}
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
