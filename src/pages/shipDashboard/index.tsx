import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import { SelectChangeEvent } from '@mui/material/Select';
import ShipGallery from './shipGallery';
import { Ships, ShipVars } from '../../api/types';
import { View } from './ship';
import { SHIPS } from '../../api';
import Actions from './actions/actions';

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
  const [shipType, setShipType] = useState<string>('');
  const shipTypes = useMemo(
    () => [...new Set(ships?.map(({ type }) => type) || [])],
    [ships]
  );

  const toggleViewChange = () => {
    setViewMode((prev) => (prev === View.LIST ? View.GALLERY : View.LIST));
  };

  const handleTypeChange = ({ target: { value } }: SelectChangeEvent) => {
    setShipType(value);
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

  const filteredShips = shipType
    ? ships?.filter(({ type }) => shipType === type)
    : ships;

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
      <Actions
        view={viewMode}
        type={shipType}
        types={shipTypes}
        handleTypeChange={handleTypeChange}
        toggleViewChange={toggleViewChange}
      />
      <ShipGallery
        data={filteredShips}
        loading={loading}
        view={viewMode}
        onLoadMore={handleLoadMore}
      />
    </Box>
  );
}
