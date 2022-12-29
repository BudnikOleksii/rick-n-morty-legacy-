import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import MenuItem from '@mui/material/MenuItem';
import { NAME_SPACES } from '../../../constants';
import { modalStyles } from '../../../modal-styles';

enum Language {
  english = 'en',
  ukrainian = 'uk',
  russian = 'ru',
}

export const LanguageSelect = () => {
  const { t, i18n } = useTranslation();
  const lang = Cookies.get('i18next') || Language.english;
  const [language, setLanguage] = useState(lang as Language);
  const [openLanguagesModal, setOpenLanguagesModal] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    const newLanguage = event.target.value as Language;

    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Box>
      <IconButton onClick={() => setOpenLanguagesModal(true)} color="secondary">
        <LanguageIcon />
      </IconButton>

      <Modal
        open={openLanguagesModal}
        onClose={() => setOpenLanguagesModal(false)}
        aria-labelledby="select-language-modal"
        aria-describedby="select-language-modal"
      >
        <Box sx={modalStyles}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {t('language', { ns: NAME_SPACES.main })}
            </InputLabel>

            <Select
              labelId="language"
              id="language"
              value={language}
              label={t('language', { ns: NAME_SPACES.main })}
              onChange={handleChange}
              MenuProps={{
                disableScrollLock: true,
              }}
            >
              <MenuItem value={Language.english}>
                {t('languages.en', { ns: NAME_SPACES.main })}
              </MenuItem>
              <MenuItem value={Language.ukrainian}>
                {t('languages.uk', { ns: NAME_SPACES.main })}
              </MenuItem>
              <MenuItem value={Language.russian}>
                {t('languages.ru', { ns: NAME_SPACES.main })}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
};
