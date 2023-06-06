import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="w-full h-[var(--header-height)] bg-blue-200">
      <ul>
        <li>
          <Link to={""}>Home</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header