import { FC, memo, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectLocations } from '../../../features/locations/locations-selectors';
import { locationsLoadingStart } from '../../../features/locations/locations-slice';
import { IAutocomplete, OrderEnum } from '../../../types/helper-types';
import { selectLots } from '../../../features/lots/lots-selectors';

interface Props {
  setQuery: (query: string) => void;
}

function valuetext(value: number) {
  return `${value}°$`;
}

export const LotsFilter: FC<Props> = memo(({ setQuery }) => {
  const dispatch = useAppDispatch();
  const { locations } = useAppSelector(selectLocations);
  const {
    pricesRange: { minPrice, maxPrice },
  } = useAppSelector(selectLots);
  const [characterName, setCharacterName] = useState('');
  const [location, setLocation] = useState<IAutocomplete | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);
  const [sortOrder, setSortOrder] = useState<OrderEnum>(OrderEnum.asc);

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

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleFiltersSubmit = () => {
    const nameQuery = characterName ? `&name=${characterName}` : '';
    const locationQuery = location ? `&locationId=${location.id}` : '';
    const minPriceQuery = priceRange[0] > minPrice ? `&minPrice=${priceRange[0]}` : '';
    const maxPriceQuery = priceRange[1] < maxPrice ? `&maxPrice=${priceRange[1]}` : '';
    const orderQuery = sortOrder !== OrderEnum.asc ? `&order=${sortOrder}` : '';

    const query = nameQuery + locationQuery + minPriceQuery + maxPriceQuery + orderQuery;
    setQuery(query);
  };

  const handleClearInputs = () => {
    setCharacterName('');
    setLocation(null);
    setPriceRange([minPrice, maxPrice]);
    setSortOrder(OrderEnum.asc);

    setQuery('');
  };

  return (
    <Grid container spacing={4} sx={{ padding: '20px' }} alignItems="center">
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
          value={location}
          onChange={handleTagsChange}
          renderInput={(params) => <TextField {...params} label="Location" />}
        />
      </Grid>

      <Grid item xs={12} sm={5} md={2}>
        <Box sx={{ textAlign: 'center' }}>
          Price range
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={minPrice}
            max={maxPrice}
            getAriaValueText={valuetext}
          />
        </Box>
      </Grid>

      <Grid item xs={12} sm={5} md={2}>
        <FormControl fullWidth>
          <InputLabel id="sortOrder">Sort order</InputLabel>
          <Select
            labelId="sortOrder"
            id="sortOrder"
            value={sortOrder}
            label="Sort order"
            onChange={(event) => setSortOrder(event.target.value as OrderEnum)}
          >
            <MenuItem value={OrderEnum.asc}>Cheapest at first</MenuItem>
            <MenuItem value={OrderEnum.desc}>Expensive at first</MenuItem>
          </Select>
        </FormControl>
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
