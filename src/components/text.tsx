import { cn } from '@/utils/cn';
import React, { ReactNode } from 'react';

type TextProps = {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'small';
  className?: string;
};

export const Text = (props: TextProps) => {
  const { as, className, ...rest } = props;

  const baseTextStyles = 'dark:text-black';

  let text = null;

  switch (as) {
    case 'h1':
      text = (
        <h1
          className={cn(
            'lg:text-5xl" scroll-m-20 text-4xl font-extrabold tracking-tight',
            'py-7',
            className,
          )}
          {...rest}
        />
      );
      break;

    case 'h2':
      text = <h2 className={cn(baseTextStyles, 'text-4xl font-bold', className)} {...rest} />;
      break;

    case 'h3':
      text = <h3 className={cn(baseTextStyles, 'text-3xl font-bold', className)} {...rest} />;
      break;

    case 'h4':
      text = (
        <h4
          className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}
          {...rest}
        />
      );
      break;

    case 'small':
      text = <small className={(cn('text-sm font-medium leading-none'), className)} {...rest} />;
      break;

    default:
      text = <p className={cn('inline-block text-base', className)} {...rest} />;
  }

  return text;
};
