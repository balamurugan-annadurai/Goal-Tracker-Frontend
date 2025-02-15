import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}
