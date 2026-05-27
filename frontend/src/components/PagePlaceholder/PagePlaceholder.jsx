import styles from './PagePlaceholder.module.css'

function PagePlaceholder({ title, description }) {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      {description ? <p className={styles.description}>{description}</p> : null}
    </section>
  )
}

export default PagePlaceholder
