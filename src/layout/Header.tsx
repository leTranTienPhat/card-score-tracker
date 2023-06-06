import { Link, useLocation, useNavigate } from "react-router-dom"

const Header = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div className="w-full h-[var(--header-height)] bg-blue-200">
      <ul className="flex justify-between">
        <li>
          <Link to={""}>Home</Link>
        </li>
        <li>
          {pathname === "/" ? <></> : <span onClick={() => navigate(-1)}>Back</span>}
        </li>
      </ul>
    </div>
  )
}

export default Header