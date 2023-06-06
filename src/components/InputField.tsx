interface IProps {
  value: string,
  onChange: (e: React.FormEvent<HTMLInputElement> | undefined) => void
}

const InputField = ({ value, onChange }: IProps) => {
  return (
    <input
      className="border-1 bg-red-200 border-red-800 "
      value={value}
      placeholder="Enter a name"
      onChange={onChange} />
  )
}

export default InputField