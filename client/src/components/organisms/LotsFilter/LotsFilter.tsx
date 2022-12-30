import { FC, memo, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectLocations } from '../../../features/locations/locations-selectors';
import { locationsLoadingStart } from '../../../features/locations/locations-slice';
import { selectLots } from '../../../features/lots/lots-selectors';
import { registerAction } from '../../../features/actions-info/actions-info-slice';
import { IAutocomplete, OrderEnum } from '../../../types/helper-types';
import { NAME_SPACES } from '../../../constants';

interface Props {
  setQuery: (query: string) => void;
}

function valuetext(value: number) {
  return `${value}°$`;
}

export const LotsFilter: FC<Props> = memo(({ setQuery }) => {
  const { t } = useTranslation();
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
    dispatch(registerAction(locationsLoadingStart.type));
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
    <Paper elevation={6} sx={{ margin: '20px', padding: '20px' }}>
      <Grid container rowSpacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={12} sm={5} md={3} lg={2}>
          <TextField
            fullWidth
            label={t('filters.character_name', { ns: NAME_SPACES.main })}
            variant="outlined"
            value={characterName}
            onChange={(event) => setCharacterName(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={5} md={3} lg={2}>
          <Autocomplete
            disablePortal
            id="location"
            options={locationsAutocomplete}
            value={location}
            onChange={handleTagsChange}
            renderInput={(params) => (
              <TextField {...params} label={t('filters.location', { ns: NAME_SPACES.main })} />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={5} md={3} lg={2}>
          <Box sx={{ textAlign: 'center' }}>
            {t('filters.price_range', { ns: NAME_SPACES.main })}
            <Slider
              getAriaLabel={() => t('filters.price_range', { ns: NAME_SPACES.main })}
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
              label={t('filters.order', { ns: NAME_SPACES.main })}
              onChange={(event) => setSortOrder(event.target.value as OrderEnum)}
            >
              <MenuItem value={OrderEnum.asc}>
                {t('filters.from_cheapest', { ns: NAME_SPACES.main })}
              </MenuItem>
              <MenuItem value={OrderEnum.desc}>
                {t('filters.from_expensive', { ns: NAME_SPACES.main })}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          lg={3}
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'space-evenly' },
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: '10px',
          }}
        >
          <Button variant="contained" color="primary" onClick={handleFiltersSubmit}>
            {t('filters.apply_btn', { ns: NAME_SPACES.main })}
          </Button>

          <Button variant="contained" color="secondary" onClick={handleClearInputs}>
            {t('filters.clear_filters', { ns: NAME_SPACES.main })}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
});
