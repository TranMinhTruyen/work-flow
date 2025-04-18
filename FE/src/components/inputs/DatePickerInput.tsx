import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import { TextFieldProps } from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateView } from '@mui/x-date-pickers/models';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ja';
import 'dayjs/locale/vi';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { FULL_DATE_FORMAT } from '@/common/constants/commonConst';
import { DateType } from '@/common/constants/typeConst';
import { selectLanguage } from '@/common/store/commonSlice';
import { capitalizeFirst, isNullOrEmpty } from '@/common/utils/stringUtil';
import { useAppSelector } from '@/lib/store';

export type DatePickerProps = Omit<
  TextFieldProps,
  'value' | 'onChange' | 'onBlur' | 'onFocus' | 'onClose' | 'onError' | 'defaultValue'
> & {
  height?: number;
  width?: number;
  value?: DateType;
  inputFormat?: string;
  views?: DateView[] | undefined;
  openTo?: DateView;
  onChange?: (value: DateType) => void;
  onFocus?: (value: DateType) => void;
  onBlur?: (value: DateType) => void;
  onClose?: (value: DateType) => void;
  error?: boolean;
  helperText?: string | null;
};

const DatePickerInput = (props: DatePickerProps) => {
  const {
    id,
    width = 200,
    label,
    value: valueProps,
    inputFormat = FULL_DATE_FORMAT,
    views,
    openTo,
    onChange,
    onFocus,
    onBlur,
    onClose,
    error = false,
    helperText,
    className,
    slotProps,
    ...restProps
  } = props;
  const [selectedDate, setSelectedDate] = useState<DateType>(null);
  const language: string = useAppSelector(selectLanguage);

  useMemo(() => {
    dayjs.locale(language === 'vi' ? 'en' : language);
  }, [language]);

  useEffect(() => {
    setSelectedDate(valueProps ?? null);
  }, [valueProps]);

  const handleOnChange = useCallback(
    (value: DateType) => {
      if (value === null) {
        setSelectedDate(null);
        onChange?.('');
        return;
      }

      setSelectedDate(dayjs(value, inputFormat).format(inputFormat));
      onChange?.(dayjs(value).format(inputFormat));
      onClose?.(dayjs(value).format(inputFormat));
    },
    [inputFormat, onChange, onClose]
  );

  const handleOnBlur = useCallback(() => {
    onBlur?.(
      isNullOrEmpty(selectedDate?.toString()) ? '' : dayjs(selectedDate).format(inputFormat)
    );
  }, [inputFormat, onBlur, selectedDate]);

  const handleOnFocus = useCallback(() => {
    onFocus?.(
      isNullOrEmpty(selectedDate?.toString()) ? '' : dayjs(selectedDate).format(inputFormat)
    );
  }, [inputFormat, onFocus, selectedDate]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={language === 'vi' ? 'en' : language}
    >
      <CustomDatePicker
        className={className}
        value={isNullOrEmpty(selectedDate?.toString()) ? null : dayjs(selectedDate)}
        views={views}
        format={inputFormat}
        openTo={openTo}
        onChange={handleOnChange}
        width={width}
        localeText={{
          todayButtonLabel: language === 'ja' ? '今日' : 'Today',
        }}
        slotProps={{
          actionBar: { actions: ['today'] },
          field: { clearable: true },
          textField: {
            id: `datePicker${capitalizeFirst(id)}`,
            placeholder: '',
            onBlur: handleOnBlur,
            onFocus: handleOnFocus,
            label: label,
            error: error,
            helperText: helperText,
            InputProps: {
              startAdornment: (
                <InputAdornment position={'start'}>
                  <CalendarMonthIcon />
                </InputAdornment>
              ),
            },
          },
          ...slotProps,
        }}
        {...restProps}
      />
    </LocalizationProvider>
  );
};

const CustomDatePicker = styled(DatePicker)<DatePickerProps>(({ width }) => ({
  '& .MuiInputLabel-root': {
    color: 'rgba(0, 0, 0, 1) !important',
    marginLeft: '10px',
  },

  '& .MuiOutlinedInput-notchedOutline legend': {
    marginLeft: '10px',
  },

  '& .MuiInputAdornment-root': {
    '& .MuiSvgIcon-root': {
      width: '20px',
      height: '20px',
    },
  },

  '& .MuiPickersInputBase-root': {
    width: width,
    height: '40px !important',
    minHeight: '40px !important',
    '& fieldset': {
      borderColor: 'rgba(13, 13, 13, 0.8)',
      borderRadius: '50px',
    },
    '&:hover fieldset': {
      borderColor: '#00b2ff',
    },
    '& .Mui-focused fieldset': {
      borderColor: '#007fb6',
    },
  },
}));

export default DatePickerInput;
