import Button from '@mui/material/Button';
import ViewListIcon from '@mui/icons-material/ViewList';
import CollectionsIcon from '@mui/icons-material/Collections';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { View } from '../ship';

export type ActionsProps = {
  view?: View;
  handleTypeChange?: (event: SelectChangeEvent) => void;
  toggleViewChange?: () => void;
  type: string;
  types: string[];
};

export default function Actions({
  view,
  handleTypeChange,
  toggleViewChange,
  type,
  types
}: ActionsProps) {
  const isListView = view === View.LIST;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        position: 'relative'
      }}
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
      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel id="ship-type-label">Type</InputLabel>
        <Select
          labelId="ship-type-label"
          id="ship-type-select"
          value={type}
          label="Type"
          autoWidth
          onChange={handleTypeChange}
        >
          {types.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {type && (
        <Button
          variant="outlined"
          onClick={() =>
            handleTypeChange &&
            handleTypeChange({ target: { value: '' } } as SelectChangeEvent)
          }
          sx={{ width: 50 }}
          size="small"
        >
          Clear
        </Button>
      )}
    </Box>
  );
}
