import React, { forwardRef } from 'react';
import cx from 'classnames';

interface TextAreaInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'ref'> {
  label?: string;
  error?: string;
  classNames?: {
    container?: string;
    label?: string;
    textarea?: string;
    error?: string;
  };
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ label, error, className, classNames, ...rest }, ref) => {
    return (
      <div
        className={cx('flex flex-col w-full px-4 mt-4', classNames?.container)}
      >
        {label && (
          <label
            htmlFor='textarea'
            className={cx('text-left text-black py-1', classNames?.label)}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cx(
            'w-full text-black shadow appearance-none leading-tight focus:outline-none border-[1px] rounded border-primary',
            classNames?.textarea,
            className,
            {
              ['!border-error']: error,
            }
          )}
          {...rest}
        />
        {error && (
          <span className={cx('text-error text-xs py-1', classNames?.error)}>
            {error}
          </span>
        )}
      </div>
    );
  }
);
