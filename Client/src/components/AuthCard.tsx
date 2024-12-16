const AuthCard = ({ children }) => {
  return (
    <div className="rounded h-full p-8 border-2 border-indigo-200 border-solid shadow">
      { children }
    </div>
  )
}

export default AuthCard