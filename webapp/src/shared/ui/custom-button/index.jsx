import styles from './styles.module.scss'

export const CustomButton = ({typeButton, style, className, children}) => {
  const getStyles = (type) => {
      switch(type) {
          case 'outline':
              return styles.CustomButtonOutline;
          case 'solid':
              return styles.CustomButtonRed;
      }
  }

  return (
      <button className={`${getStyles(typeButton)} ${className}`} style={style}>
          {children}
      </button>
  )
}