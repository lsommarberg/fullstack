import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
        return (`you added '${action.payload.content}'`)
    case "VOTE":
        return (`you voted '${action.payload.content}'`)
    case "CLEAR":
        return null
    case "TOO_SHORT":
        return ('too short anecdote, must have length 5 or longer')
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
