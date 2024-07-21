import styles from '@/styles/addFavorite.module.css'

export default function AddFavorite({ closeMethod, addMethod }) {


  return (
    <div className={styles.fullscreen}>
      <div className={styles.popup}>
        <button onClick={closeMethod}>Close</button>
        <form className={styles.form}>
          <div>
            <label htmlFor='name'>Name: </label>
            <input id='name' name='name' type='text'></input>
          </div>
          <div>
            <label htmlFor='address'>Address: </label>
            <input id='address' name='address' type='url'></input>
          </div>
          <div>
            <button onClick={addMethod}>Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}