import styles from './styles.module.scss';

export const Footer = () => {
  return (
      <footer className={`${styles.blockFooter}`}>
          <div className={`d-flex justify-content-between align-items-center mx-auto ${styles.containerFooter}`}>
              &copy; ЦирюльникЪ. Все права защищены
              <div className={'d-flex justify-content-between'}>
                  <img src={window.location.origin + '/Telegram.svg'}/>
                  <img src={window.location.origin + '/VK.svg'} className={styles.iconFooterLeft}/>
              </div>
          </div>
      </footer>
  )
}
