import styles from '@/styles/results.module.css';

export default function RedditResults({ results, selected }) {
  return (
    <>
    {results.subreddits?.slice(0, 4).map((item, index) => (
        <div key={index} className={styles.result + (index === selected ? ' ' + styles.selected : '')} onClick={() => window.open(item, '_self')}>
          <img src={item.icon_img ? item.icon_img : "//www.redditstatic.com/desktop2x/img/favicon/favicon-96x96.png"} alt={item.name} style={{width: '50px', height: '50px'}}/>
          <a href={`https://reddit.com/r/${item.name}`} target={'_self'}>{`r/${item.name}`}</a>
        </div>
      ))}
    </>
  );
}
