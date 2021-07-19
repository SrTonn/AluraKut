import React, { createContext, useState } from 'react'
import nookies from 'nookies'
import PropTypes from 'prop-types'
import { firebase, auth } from '../services/firebase'

export const UserContext = createContext({})

export function UserContextProvider(props) {
  const [user, setUser] = useState()
  const { children } = props

  async function loginWithGithub() {
    try {
      const result = await auth.signInWithPopup(
        new firebase.auth.GithubAuthProvider(),
      )
      console.log('UserContext result => ', result)
      if (result.additionalUserInfo) {
        const { id, login, avatarUrl } = result.additionalUserInfo.profile
        if (!login || !avatarUrl) {
          throw new Error('Missing information from Github Account')
        }
        const userInfos = {
          id,
          username: login,
          avatarUrl,
        }
        console.log('UserContext result.additionalUserInfo.profile =>', result.additionalUserInfo.profile)

        setUser(userInfos)
        nookies.set(null, 'CURRENT_USER', JSON.stringify(user), {
          path: '/',
          maxAge: 86400 * 7,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  // console.log('lool', result)
  return (
    <UserContext.Provider value={{ user, setUser, loginWithGithub }}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
