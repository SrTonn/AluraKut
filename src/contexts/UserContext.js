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
      if (result.additionalUserInfo) {
        // eslint-disable-next-line camelcase
        const { id, login, avatar_url } = result.additionalUserInfo.profile
        // eslint-disable-next-line camelcase
        if (!login || !avatar_url) {
          throw new Error('Missing information from Github Account')
        }
        const userInfo = {
          id,
          username: login,
          avatarUrl: avatar_url,
        }

        setUser(userInfo)
        nookies.set(null, 'CURRENT_USER', JSON.stringify(userInfo), {
          path: '/',
          maxAge: 86400 * 7,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, loginWithGithub }}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
