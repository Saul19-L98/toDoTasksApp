import cx from 'classnames';
import React from 'react';

type TitleStyles = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  order?: TitleStyles;
  orderStyle?: TitleStyles;
}

export const Title = ({
  order: Order = 'h1',
  orderStyle = 'h1',
  className,
  ...rest
}: Props) => {
  const style = orderStyle !== Order ? orderStyle : Order;

  return <Order className={cx(style, className)} {...rest} />;
};
