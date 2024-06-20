import styles from './styles.module.scss';

export const Footer = () => {
  return (
      <footer className={`${styles.blockFooter} text-white`}>
          <div className={`d-flex justify-content-between align-items-center mx-auto ${styles.containerFooter}`}>
              &copy; ЦирюльникЪ. Все права защищены
              <div className={'d-flex justify-content-between'}>
                  <img src={'./Telegram.svg'}/>
                  <img src={'./VK.svg'} className={styles.iconFooterLeft}/>
              </div>
          </div>
      </footer>
  )
}