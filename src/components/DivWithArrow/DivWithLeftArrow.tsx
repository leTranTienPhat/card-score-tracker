import { useEffect } from "react"
import "./styles.css"

interface IProps {
  className: string,
  isOpenSelectionMenu: boolean,
  toggleSelectionMenu: () => void,
  children: React.ReactElement
}

const DivWithLeftArrow = ({ className, isOpenSelectionMenu, toggleSelectionMenu, children }: IProps) => {
  // useEffect(() => {
  //   const detectClickOutside = (e: any) => {
  //     if (document.getElementById('player-selection')?.contains(e.target)) {
  //       console.log("Inside")
  //     } else {
  //       console.log("outside")
  //       if (isOpenSelectionMenu) toggleSelectionMenu()
  //     }
  //   }

  //   window.addEventListener('click', detectClickOutside)

  //   return () => {
  //     window.removeEventListener('click', detectClickOutside)
  //   }

  // }, [toggleSelectionMenu, isOpenSelectionMenu])

  return (
    <div id="player-selection" className={`arrow_box ${className}`}>
      {children}
    </div>
  )
}

export default DivWithLeftArrow