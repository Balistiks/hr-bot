import styles from './styles.module.scss';

export const Header = () => {
  return (
      <header className={`fixed-top bg-white`}>
          <div className={`${styles.containerHeader}`}>
              <img src={'./Back.svg'}/>
              <img src={'./Logo.svg'}/>
              <img src={'./User.svg'}/>
          </div>
      </header>
  )
}