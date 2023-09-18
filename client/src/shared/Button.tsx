import React from 'react';
import cx from 'classnames';

export const DefaultComponent = 'button' as const;
export type DefaultComponentType = typeof DefaultComponent;

export type ButtonPropsCustom<E extends React.ElementType> = {
  children: React.ReactNode;
  component?: E;
};

export type ButtonProps<E extends React.ElementType> = ButtonPropsCustom<E> &
  Omit<React.ComponentProps<E>, keyof ButtonPropsCustom<E>>;

export const Button = <E extends React.ElementType = DefaultComponentType>({
  children,
  className,
  component,
  ...otherProps
}: ButtonProps<E>) => {
  const Tag = component || DefaultComponent;

  return (
    <Tag
      className={cx(
        'bg-primary hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-inter font-semibold ',
        className
      )}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};
