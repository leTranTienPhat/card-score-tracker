const TienLen = () => {
  if (typeof (Storage) !== "undefined") {
    alert("Can use local storage")
  } else {
    alert("no local storage")
  }
  return (
    <div>TienLen</div>
  )
}

export default TienLen