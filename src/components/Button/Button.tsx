interface IProps {
  className?: string
  onClick: () => void,
  children: React.ReactElement
}

const Button = ({ className = "border-2 border-blue-500 p-2", onClick, children }: IProps) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button