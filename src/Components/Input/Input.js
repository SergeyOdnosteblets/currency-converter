import styles from './Input.module.scss';

export const Input = (props) => {
  return (
    <div className={styles.group}>
      <input
        className={styles.input}
        type="text"
        value={props.amount}
        onChange={(event) => props.onAmountChange(event.target.value)}
      />
      <select
        className={styles.select}
        value={props.currency}
        onChange={(event) => props.onCurrencyChange(event.target.value)}>
        {props.currencies.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};
