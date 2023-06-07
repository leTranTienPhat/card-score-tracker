import { useEffect } from "react"
import "./styles.css"

interface IProps {
  className: string,
  isOpenSelectionMenu: boolean,
  toggleSelectionMenu: () => void,
  children: React.ReactElement
}

const DivWithLeftArrow = ({ className, isOpenSelectionMenu, toggleSelectionMenu, children }: IProps) => {
  useEffect(() => {
    const detectClickOutside = (e: any) => {
      if (!document.getElementById('player-selection')?.contains(e.target)) {
        if (isOpenSelectionMenu) toggleSelectionMenu()
      }
    }
    window.addEventListener('mouseup', detectClickOutside)
    return () => {
      window.removeEventListener('mouseup', detectClickOutside)
    }

  }, [toggleSelectionMenu, isOpenSelectionMenu])

  return (
    <div id="player-selection" className={`arrow_box ${className} z-50`}>
      {children}
    </div>
  )
}

export default DivWithLeftArrow