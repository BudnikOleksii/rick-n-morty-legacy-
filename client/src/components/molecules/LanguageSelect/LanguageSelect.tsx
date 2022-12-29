import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const lang = window.localStorage.getItem('i18nextLng') || 'en';
  const [language, setLanguage] = useState(lang);

  const handleChange = (event: SelectChangeEvent) => {
    const newLanguage = event.target.value as string;

    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Box sx={{ position: 'absolute', right: '5%', top: '80px' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="Language"
          onChange={handleChange}
          MenuProps={{
            disableScrollLock: true,
          }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="uk">Ukrainian</MenuItem>
          <MenuItem value="ru">Russian</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
