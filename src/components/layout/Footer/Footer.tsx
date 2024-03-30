import React from 'react';

import cn from 'clsx';
import styles from './Footer.module.css';

export const Footer = (): React.JSX.Element => {
  return <footer className={cn('container', styles.container)}>Footer</footer>;
};
