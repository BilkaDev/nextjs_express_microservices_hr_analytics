import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';

import { useTranslate } from '@/client/contex/translations/useTranslate';
import { useLanguage } from '@/client/contex/translations/translation';
import { availableLanguages, AvailableLocale } from '@/language';
import { mergeSx } from '../../../common/mergeSx/mergeSx';

import * as styles from './SelectedLanguage.styles';
import { SelectedLanguageProps } from './SelectedLanguage.types';
import { useIntl } from 'react-intl';

export const SelectedLanguage = ({
  isLabel,
  sx = {}
}: SelectedLanguageProps) => {
  const { locale } = useIntl();

  const translate = useTranslate();
  const selectedHandler = (e: SelectChangeEvent<AvailableLocale>) => {
    // changeLanguage(e.target.value as AvailableLocale);
  };

  const capitalize = (text: string): string =>
    text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <FormControl sx={mergeSx(styles.container, sx)}>
      {isLabel && (
        <InputLabel id="language-select-label">
          {' '}
          {translate('language')}
        </InputLabel>
      )}
      <Select
        id="language-select"
        value={locale as 'pl'}
        label={isLabel && 'Language'}
        onChange={selectedHandler}
      >
        {Object.values(availableLanguages).map(item => (
          <MenuItem key={item.locale} value={item.locale}>
            {capitalize(item.locale)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
