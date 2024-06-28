import styles from './styles.module.scss'

export const CustomButton = ({typeButton, style, className, children, type, onClick}) => {
  const getStyles = (type) => {
      switch(type) {
          case 'outline':
              return styles.CustomButtonOutline;
          case 'solid':
              return styles.CustomButtonRed;
          case 'gray':
              return styles.CustomButtonGray;
          case 'red-icon':
              return styles.CustomButtonRedIcon;
          case 'white-icon':
              return styles.CustomButtonWhiteIcon;
          case 'white-icon-box':
              return styles.CustomButtonWhiteIconBox;
      }
  }

  return (
      <button className={`${getStyles(typeButton)} ${className}`} style={style} type={type} onClick={onClick}>
          {children}
      </button>
  )
}