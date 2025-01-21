import styles from '@/styles/results.module.css';

export default function GithubResults({results, selected}) {
  return (
    <>
      {results.items && results.items?.map((item, index) => (
        <div key={item.id} className={styles.result + (index === selected ? ' ' + styles.selected : '')}
             onClick={() => window.open(item.html_url, '_self')}>
          <img src={item.avatar_url} alt={item.name}
               style={{width: '50px', height: '50px'}}/>
          <a href={item.html_url} target={'_self'}>{item.type === 'User' ? item.login : item.full_name}</a>
        </div>
      ))}
      {results.length > 0 && results.map((item, index) => (
        <div key={item.id} className={styles.result + (index === selected ? ' ' + styles.selected : '')}
             onClick={() => window.open(item.html_url, '_self')}>
          <img src={item.owner.avatar_url} alt={item.name}
               style={{width: '50px', height: '50px'}}/>
          <a href={item.html_url} target={'_self'}>{item.name}</a>
        </div>
      ))}
    </>
  );
}
