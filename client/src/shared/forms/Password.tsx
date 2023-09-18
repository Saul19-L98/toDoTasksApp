import { forwardRef } from 'react';
import cx from 'classnames';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  label?: string;
  error?: string;
  classNames?: {
    container?: string;
    label?: string;
    input?: string;
    error?: string;
  };
  children?: React.ReactNode;
  showPasswordToggle?: boolean;
  onTogglePasswordVisibility?: () => void;
  isPasswordVisible?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      error,
      className,
      classNames,

      showPasswordToggle,
      onTogglePasswordVisibility,
      isPasswordVisible,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={cx('flex flex-col w-full px-4 mt-4', classNames?.container)}
      >
        {label && (
          <label
            htmlFor='email'
            className={cx('text-left text-black py-1', classNames?.label)}
          >
            {label}
          </label>
        )}
        <div className='relative'>
          <input
            ref={ref}
            className={cx(
              'w-full text-black shadow appearance-none leading-tight focus:outline-none border-[1px] rounded border-primary',
              classNames?.input,
              className,
              { ['border-error']: error }
            )}
            {...rest}
          />
          {showPasswordToggle && (
            <button
              className='absolute right-0 mr-2 text-center transform -translate-y-1/2 text-stone-700 top-1/2'
              onClick={(e) => {
                e.preventDefault();
                onTogglePasswordVisibility?.();
              }}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
        {error && (
          <span className={cx('text-error text-xs py-1', classNames?.error)}>
            {error}
          </span>
        )}
      </div>
    );
  }
);
