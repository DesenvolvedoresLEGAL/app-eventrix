
import React, { memo } from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper genérico para páginas simples que apenas importam e renderizam um componente
 */
const PageWrapper: React.FC<PageWrapperProps> = memo(({ children, className }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
});

PageWrapper.displayName = 'PageWrapper';

export default PageWrapper;
