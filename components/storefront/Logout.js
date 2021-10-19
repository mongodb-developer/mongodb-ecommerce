import React from 'react'

const Logout = () => {
  return (
    <a
      className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0"
      href="/api/auth/logout"
    >
      Logout
    </a>
  )
}

export default Logout
