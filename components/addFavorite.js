import styles from '@/styles/addFavorite.module.css'

export default function AddFavorite({ closeMethod, addMethod }) {


  getName(() => {
    var name = document.getElementById('name').value;
    var names = [];
    names.append(name);
    return names;
  });

  getURL(() => {
    var url = document.getElementById('url').value;
    var urls = []
    urls.append(url);
    return urls;
  });

  return (
    <div className={styles.fullscreen}>
      <div className={styles.popup}>
        <button onClick={closeMethod} className={styles.close}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        <form className={styles.form}>
          <h2>Add Favorite</h2>
          <div>
            <label htmlFor='name'>Name: </label>
            <input id='name' name='name' type='text'></input>
          </div>
          <div>
            <label htmlFor='url'>URL: </label>
            <input id='url' name='url' type='url'></input>
          </div>
          <div>
            <button onClick={addMethod}>Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}