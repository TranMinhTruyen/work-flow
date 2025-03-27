import { Breakpoint } from '@mui/material';
import { ReactNode } from 'react';

import { MessageType } from '@/common/enums/messageEnum';

export type DialogType = 'confirm' | 'message';

export type DialogProps = {
  type: DialogType;
  maxWidth?: Breakpoint | false;
  bodyElement?: ReactNode;
  messageType?: MessageType;
  cancelText?: string;
  confirmText?: string;
  isPopup?: boolean;
  showCancelButton?: boolean;
  showCloseButton?: boolean;
  /**
   * Auto close dialog after timeout
   * @default false
   */
  autoClose?: boolean;
  /**
   * Show countdown time
   * @default true
   */
  showCountdown?: boolean;
  /**
   * Countdown time
   * @default 10 second
   */
  timeout?: number;
  countdown?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
};
