import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback, useEffect } from 'react';
import { Ship } from '../../../api/types';
import ShipView, { View } from '../ship';

export type ShipGalleryProps = {
  loading?: boolean;
  data?: Ship[];
  view?: View;
  onLoadMore: (offset?: number) => void;
};

export default function ShipGallery({
  data,
  loading,
  view = View.GALLERY,
  onLoadMore
}: ShipGalleryProps) {
  const handleScroll: EventListener = useCallback(
    (event: Event) => {
      const currentTarget = event.currentTarget as Document;
      const { scrollingElement } = currentTarget;

      if (
        scrollingElement &&
        scrollingElement.scrollTop + scrollingElement.clientHeight >=
          scrollingElement.scrollHeight
      ) {
        onLoadMore(data?.length);
      }
    },
    [data]
  );

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Box
      maxWidth="xl"
      data-testid="ShipGalleryContainer"
      flexDirection={view === View.GALLERY ? 'row' : 'column'}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 2,
        overflowY: 'auto'
      }}
    >
      {data?.map((item) => (
        <ShipView key={item.id} data={item} view={view} />
      ))}
      {loading && <CircularProgress data-testid="ShipGallerySpinner" />}
    </Box>
  );
}
