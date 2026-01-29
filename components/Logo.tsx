import React, { useState, useEffect } from 'react';

import darkLogo from '../assets/images/light-label.png';
import lightLogo from '../assets/images/main-label.png';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  isLightMode?: boolean;
}

const sizeMap = {
  icon: { sm: 'h-7 w-7', md: 'h-9 w-9', lg: 'h-12 w-12' },
  full: { sm: 'h-7', md: 'h-9', lg: 'h-12' },
};

const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md', isLightMode }) => {
  const [lightMode, setLightMode] = useState(() => document.body.classList.contains('light-mode'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setLightMode(document.body.classList.contains('light-mode'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const resolved = isLightMode ?? lightMode;
  const className = sizeMap[variant][size];

  return (
    <img
      src={resolved ? lightLogo : darkLogo}
      alt="SponsrBridge"
      className={className}
    />
  );
};

export default Logo;
