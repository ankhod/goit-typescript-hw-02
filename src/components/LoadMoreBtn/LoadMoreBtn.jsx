import styles from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      Load more
    </button>
  );
}
