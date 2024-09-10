import styles from '@/styles/results.module.css';

export default function GithubSearchResults({results, selected}) {
  return (
    <>
      {results.items?.map((item, index) => (
        <div key={item.id} className={styles.result + (index === selected ? ' ' + styles.selected : '')}
             onClick={() => window.open(item.url, '_self')}>
          <img src={item.owner.avatar_url} alt={item.name} style={{width: '50px', height: '50px'}}/>
          <a href={item.url} target={'_self'}>{item.full_name}</a>
        </div>
      ))}
    </>
  );
}
