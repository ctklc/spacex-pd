import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import CollectionsIcon from '@mui/icons-material/Collections';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useState } from 'react';
import Box from '@mui/material/Box';
import ShipGallery from '../../components/shipGallery';
import { Ships, ShipVars } from '../../api/types';
import { SHIPS } from '../../api';
import { View } from '../../components/ship';

export default function ShipDashboard() {
  const { loading, data: { ships } = {} } = useQuery<Ships, ShipVars>(SHIPS, {
    variables: { limit: 20 }
  });
  const [viewMode, setViewMode] = useState<View>(View.GALLERY);

  const toggleViewChange = () => {
    setViewMode((prev) => (prev === View.LIST ? View.GALLERY : View.LIST));
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
      <ShipGallery data={ships} loading={loading} view={viewMode} />
    </Box>
  );
}
