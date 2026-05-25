import clsx from 'clsx'
import styles from './Button.module.scss'

type ButtonSize = 'small' | 'medium' | 'large'

type ButtonProps = {
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  size?: ButtonSize
  onClick?: () => void
}

export function Button({
  children,
  active = false,
  disabled = false,
  loading = false,
  fullWidth = false,
  size = 'medium',
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        styles.button,
        styles[size],
        {
          [styles.active]: active,
          [styles.disabled]: disabled,
          [styles.loading]: loading,
          [styles.fullWidth]: fullWidth,
        }
      )}
    >
      {loading ? 'Загрузка...' : children}
    </button>
  )
}