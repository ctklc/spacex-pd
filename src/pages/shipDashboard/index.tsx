import Button from '@mui/material/Button';
import CollectionsIcon from '@mui/icons-material/Collections';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import ShipGallery from './shipGallery';
import { Ships, ShipVars } from '../../api/types';
import { View } from './ship';
import { SHIPS } from '../../api';

export default function ShipDashboard() {
  const shipsLimit = 15;
  const {
    loading,
    data: { ships } = {},
    fetchMore
  } = useQuery<Ships, ShipVars>(SHIPS, {
    variables: {
      limit: shipsLimit
    }
  });
  const [viewMode, setViewMode] = useState<View>(View.GALLERY);

  const toggleViewChange = () => {
    setViewMode((prev) => (prev === View.LIST ? View.GALLERY : View.LIST));
  };

  const handleLoadMore = (offset?: number) => {
    // offset is not multiples of ships limit there is no more data and no need
    // to fetch more. this check prevents unnecessary requests.
    if (offset && offset % shipsLimit === 0) {
      fetchMore({
        variables: { limit: shipsLimit, offset },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            ships: [...prev.ships, ...fetchMoreResult.ships]
          };
        }
      });
    }
  };

  const isListView = viewMode === View.LIST;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        position: 'relative'
      }}
      data-testid="ShipDashboardContainer"
    >
      <Button
        variant="outlined"
        startIcon={isListView ? <ViewListIcon /> : <CollectionsIcon />}
        aria-label="viewMode"
        onClick={toggleViewChange}
        sx={{ width: 200 }}
        size="small"
      >
        {isListView ? 'List View' : 'Gallery View'}
      </Button>
      <ShipGallery
        data={ships}
        loading={loading}
        view={viewMode}
        onLoadMore={handleLoadMore}
      />
    </Box>
  );
}
