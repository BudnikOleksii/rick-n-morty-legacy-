import { FC, memo, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectLocations } from '../../../features/locations/locations-selectors';
import { locationsLoadingStart } from '../../../features/locations/locations-slice';
import Button from '@mui/material/Button';
import { IAutocomplete } from '../../../types/autocompete';

interface Props {
  setQuery: (query: string) => void;
}

export const LotsFilter: FC<Props> = memo(({ setQuery }) => {
  const dispatch = useAppDispatch();
  const { locations } = useAppSelector(selectLocations);
  const [characterName, setCharacterName] = useState('');
  const [location, setLocation] = useState<IAutocomplete | null>(null);

  useEffect(() => {
    dispatch(locationsLoadingStart());
  }, []);

  const locationsAutocomplete = useMemo(() => {
    return locations.map((loc) => ({
      id: loc.id,
      label: loc.name,
    }));
  }, [locations]);

  const handleTagsChange = (event: SyntheticEvent, value: IAutocomplete | null) => {
    setLocation(value);
  };

  const handleFiltersSubmit = () => {
    const nameQuery = characterName ? `&name=${characterName}` : '';
    const locationQuery = location ? `&locationId=${location.id}` : '';

    const query = nameQuery + locationQuery;
    setQuery(query);
  };

  const handleClearInputs = () => {
    setCharacterName('');
    setLocation(null);

    setQuery('');
  };

  return (
    <Grid container spacing={2} sx={{ padding: '20px' }} alignItems="center">
      <Grid item xs={12} sm={5} md={2}>
        <TextField
          fullWidth
          label="Character Name"
          variant="outlined"
          value={characterName}
          onChange={(event) => setCharacterName(event.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={5} md={2}>
        <Autocomplete
          disablePortal
          id="location"
          options={locationsAutocomplete}
          sx={{ width: 300 }}
          value={location}
          onChange={handleTagsChange}
          clearOnBlur={false}
          renderInput={(params) => <TextField {...params} label="Location" />}
        />
      </Grid>

      <Grid item xs={12} sm={5} md={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFiltersSubmit}
          sx={{ marginRight: '10px' }}
        >
          Apply filters
        </Button>

        <Button variant="contained" color="secondary" onClick={handleClearInputs}>
          Clear filters
        </Button>
      </Grid>
    </Grid>
  );
});
