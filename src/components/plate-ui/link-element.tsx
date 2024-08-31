import type { TLinkElement } from '@udecode/plate-link';

import { cn, withRef } from '@udecode/cn';
import { useLink } from '@udecode/plate-link/react';
import { PlateElement, useElement } from '@udecode/plate-common';

export const LinkElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const element = useElement<TLinkElement>();
    const { props: linkProps } = useLink({ element });

    return (
      <PlateElement
        asChild
        className={cn(
          'font-medium text-primary underline decoration-primary underline-offset-4',
          className
        )}
        ref={ref}
        {...(linkProps as any)}
        {...props}
      >
        <a>{children}</a>
      </PlateElement>
    );
  }
);
