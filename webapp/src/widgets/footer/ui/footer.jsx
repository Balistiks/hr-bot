import styles from './styles.module.scss';

export const Footer = () => {
  return (
      <footer className={`${styles.blockFooter}`}>
          <div className={`d-flex justify-content-between align-items-center mx-auto ${styles.containerFooter}`}>
              &copy; ЦирюльникЪ. Все права защищены
            <div className={'d-flex justify-content-between'}>
              <a href="https://t.me/rabota_v_cirulnike">
                <img src={window.location.origin + '/Telegram.svg'}/>
              </a>
              <a href="https://vk.me/cirulnik_su">
                <img src={window.location.origin + '/VK.svg'} className={styles.iconFooterLeft}/>
              </a>
            </div>
          </div>
      </footer>
  )
}
