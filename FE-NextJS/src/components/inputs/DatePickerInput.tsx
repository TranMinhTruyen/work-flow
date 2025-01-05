'use client';
import { FULL_DATE_FORMAT } from '@/common/constants/commonConst';
import { DateType } from '@/common/constants/typeConst';
import { I18nEnum } from '@/common/enums/I18nEnum';
import { capitalizeFirst, isNullOrEmpty } from '@/common/utils/stringUtil';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import { TextFieldProps } from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateView } from '@mui/x-date-pickers/models/views';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

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
    value,
    defaultValue,
    inputFormat = FULL_DATE_FORMAT,
    views,
    openTo,
    onChange,
    onFocus,
    onBlur,
    onClose,
    error = false,
    helperText,
    i18n,
    className,
    slotProps,
  } = props;
  const [selectedDate, setSelectedDate] = useState<DateType>(defaultValue ?? '');

  useEffect(() => {
    if (value === selectedDate) {
      return;
    }
    if (value !== undefined) {
      setSelectedDate(value);
    }
  }, [selectedDate, value]);

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomDatePicker
        className={className}
        value={isNullOrEmpty(selectedDate?.toString()) ? null : dayjs(selectedDate, inputFormat)}
        views={views}
        format={inputFormat}
        openTo={openTo}
        onChange={handleOnChange}
        width={width}
        i18n={i18n}
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
                  <CalendarMonthIcon fontSize={'small'} />
                </InputAdornment>
              ),
            },
          },
          ...slotProps,
        }}
      />
    </LocalizationProvider>
  );
};

const CustomDatePicker = styled(DatePicker)<DatePickerProps>(({ width }) => ({
  '& .MuiInputLabel-root': {
    color: 'rgba(13, 13, 13) !important',
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

  '& .MuiOutlinedInput-root': {
    width: width,
    height: '40px !important',
    minHeight: '40px !important',
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
}));

export default DatePickerInput;
