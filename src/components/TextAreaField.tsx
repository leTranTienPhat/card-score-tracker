interface IProps {
  value: string,
  onChange: (e: string) => void,
  isEditing: boolean
}

const TextAreaField = ({ value, onChange, isEditing }: IProps) => {
  return (
    <textarea
      value={value}
      className="border-2 border-black"
      onChange={e => onChange(e.target.value)}
      readOnly={!isEditing}
    />
  )
}

export default TextAreaField