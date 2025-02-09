import styles from '@/styles/results.module.css';

export default function SpotifyResults({ results, selected }) {
  return (
    <>
    {results.tracks?.items?.map((item, index) => (
        <div key={item.id} className={styles.result + (index === selected ? ' ' + styles.selected : '')} onClick={() => window.open(item.external_urls.spotify, '_self')}>
          <img src={item.album.images[0].url} alt={item.name} style={{width: '50px', height: '50px'}}/>
          <a href={item.external_urls?.spotify} target={'_self'}>{item.name}</a>
        </div>
      ))}
    </>
  );
}
