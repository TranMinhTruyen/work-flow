import { TextFieldProps } from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateView } from '@mui/x-date-pickers/models/views';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateType } from '../../common/utils/dateUtil';
import { useCallback, useLayoutEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { capitalizeFirst, isNullOrEmpty } from '../../common/utils/stringUtil';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { I18nEnum } from '../../common/enums/i18nEnum';

export type DatePickerProps = Omit<
  TextFieldProps,
  'value' | 'onChange' | 'onBlur' | 'onFocus' | 'onClose'
> & {
  i18n: I18nEnum;
  height?: number;
  width?: number;
  value?: DateType;
  defaultValue?: DateType;
  inputFormat?: string;
  views?: DateView[] | undefined;
  openTo?: DateView;
  onChange?: (value: string) => void;
  onFocus?: (value: string) => void;
  onBlur?: (value: string) => void;
  onClose?: (value: string) => void;
  error?: boolean;
  helperText?: string | null;
};

const DatePickerInput = (props: DatePickerProps) => {
  const {
    id,
    width = 200,
    label,
    value,
    defaultValue,
    inputFormat = 'DD/MM/YYYY',
    views,
    openTo,
    onChange,
    onFocus,
    onBlur,
    onClose,
    error = false,
    helperText,
  } = props;
  const [selectedDate, setSelectedDate] = useState<DateType>(defaultValue ?? '');

  useLayoutEffect(() => {
    if (value === selectedDate) {
      return;
    }
    if (value !== undefined) {
      setSelectedDate(value);
    }
  }, [selectedDate, value]);

  const handleOnChange = useCallback(
    (value: Moment | null) => {
      if (value === null) {
        setSelectedDate(null);
        onChange?.('');
        return;
      }

      setSelectedDate(value.format(inputFormat));
      onChange?.(value.format(inputFormat));
      onClose?.(value.format(inputFormat));
    },
    [inputFormat, onChange, onClose]
  );

  const handleOnBlur = useCallback(() => {
    onBlur?.(
      isNullOrEmpty(selectedDate?.toString()) ? '' : moment(selectedDate).format(inputFormat)
    );
  }, [inputFormat, onBlur, selectedDate]);

  const handleOnFocus = useCallback(() => {
    onFocus?.(
      isNullOrEmpty(selectedDate?.toString()) ? '' : moment(selectedDate).format(inputFormat)
    );
  }, [inputFormat, onFocus, selectedDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        value={isNullOrEmpty(selectedDate?.toString()) ? null : moment(selectedDate, inputFormat)}
        views={views}
        format={inputFormat}
        openTo={openTo}
        onChange={handleOnChange}
        slotProps={{
          field: { clearable: true },
          textField: {
            id: `datePicker${capitalizeFirst(id)}`,
            onBlur: handleOnBlur,
            onFocus: handleOnFocus,
            label: label,
            error: error,
            helperText: helperText,
            slotProps: {
              inputLabel: {
                shrink: true,
              },
            },
            InputProps: {
              startAdornment: (
                <InputAdornment position={'start'} sx={{ marginBottom: '2px' }}>
                  <CalendarMonthIcon />
                </InputAdornment>
              ),
            },
            sx: {
              '& .MuiInputLabel-root': {
                color: 'rgba(13, 13, 13) !important',
                marginLeft: '10px',
              },

              '& .MuiOutlinedInput-notchedOutline legend': {
                marginLeft: '10px',
              },

              '& .MuiOutlinedInput-root': {
                width: width,
                height: '50px !important',
                minHeight: '50px !important',
                '& fieldset': {
                  borderColor: 'rgba(13, 13, 13, 0.8)',
                  borderRadius: 50,
                },
                '&:hover fieldset': {
                  borderColor: '#00b2ff',
                },
                '& .Mui-focused fieldset': {
                  borderColor: '#007fb6',
                },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
export default DatePickerInput;
