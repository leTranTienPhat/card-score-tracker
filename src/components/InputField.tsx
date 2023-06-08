interface IProps {
  value: string,
  type?: string,
  placeholder?: string,
  onChange: (e: React.FormEvent<HTMLInputElement> | undefined) => void
  onBlur?: () => void
  isEditing?: boolean
}

const InputField = ({ value, type = "text", placeholder = "Enter a name", onChange, onBlur, isEditing = true }: IProps) => {
  return (
    <input
      className="border-1 bg-red-200 border-red-800 "
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      readOnly={!isEditing}
    />
  )
}

export default InputField