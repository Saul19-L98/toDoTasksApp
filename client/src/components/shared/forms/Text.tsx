import { forwardRef } from "react";
import cx from "classnames";

interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "ref"> {
  label?: string;
  error?: string;
  classNames?: {
    container?: string;
    label?: string;
    input?: string;
    error?: string;
  };
  children?: React.ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, className, classNames, children, ...rest }, ref) => {
    return (
      <div
        className={cx("flex flex-col w-full px-4 mt-4", classNames?.container)}
      >
        {label && (
          <label
            htmlFor="email"
            className={cx("text-left text-black py-1", classNames?.label)}
          >
            {label}
          </label>
        )}
        {children === undefined ? (
          <input
            ref={ref}
            className={cx(
              "w-full text-black shadow appearance-non leading-tight focus:outline-none border-[1px] rounded border-primary",
              classNames?.input,
              className,
              {
                [" !border-error"]: error,
              }
            )}
            {...rest}
          />
        ) : (
          <div className="flex flex-row gap-2">
            <input
              ref={ref}
              className={cx(
                "w-full text-black shadow appearance-non leading-tight focus:outline-none border-[1px] rounded border-primary",
                classNames?.input,
                className,
                {
                  [" !border-error"]: error,
                }
              )}
              {...rest}
            />
            {children}
          </div>
        )}
        {error && (
          <span className={cx("text-error text-xs py-1", classNames?.error)}>
            {error}
          </span>
        )}
      </div>
    );
  }
);
