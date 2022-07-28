import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import styles from './Header.module.scss';

export const Header = ({ usd, eur, onChangeTheme }) => {
  return (
    <div className={styles.header}>
      <div className={styles.rates}>
        <div className={styles.rate__usd}>USD: {usd}</div>
        <div className={styles.rate__usd}>EUR: {eur}</div>
      </div>
      <div>
        <FormControlLabel control={<Switch defaultChecked />} onClick={onChangeTheme} />
      </div>
    </div>
  );
};
