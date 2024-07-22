const Notification = ({ message, errorMessage }) => {

  if (errorMessage  !== null) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }
  if (message === null) {
    return null
  }

  return (
    <div className="added">
      {message}
    </div>
  )
}

export default Notification