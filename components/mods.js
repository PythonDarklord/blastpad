import styles from '@/styles/search.module.css'

export default function Mods({mod}) {

  if (mod.length === 0) {
    return
  }

  return (
    <div className={styles.mod}>
      {mod}
    </div>
  )
}