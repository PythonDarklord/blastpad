import styles from '@/styles/search.module.css'

export default function Mods({mod}) {
  return (
    <div className={`${styles.mod} ${mod.className}`}>
      {mod.bubble}
    </div>
  )
}