import React from 'react';
import { ButtonProps } from './Button.interface';

const Button = (props: ButtonProps) => {
  const { onClick, children } = props;

  const handleClick = () => {
    onClick();
  }

  return <button onClick={handleClick}>{children}</button>;
};
export default Button;