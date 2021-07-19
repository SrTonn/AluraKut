import React/* , { useState, useContext } */ from 'react'
// import nookies from 'nookies'
import { useRouter } from 'next/router'
import { useUser } from '../src/hooks/userUser'

export default function LoginScreen() {
  // const [githubUser, setGithubUser] = useState('')
  // const [userInteraction, setUserInteraction] = useState(false)
  const router = useRouter()

  const { user, loginWithGithub } = useUser()

  async function handleSubmitLogin() {
    // e.preventDefault()
    if (!user) {
      await loginWithGithub()
    }

    console.log('pag login user =>', user)
    console.log('pag login loginWithGithub =>', loginWithGithub)
    router.push('/')
  }
  // function handleSubmitLogin(e) {
  //   e.preventDefault()
  //   fetch('https://alurakut.vercel.app/api/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ githubUser }),
  //   })
  //     .then(async (respostaDoServer) => {
  //       const dadosDaResposta = await respostaDoServer.json()
  //       const { token } = dadosDaResposta
  //       nookies.set(null, 'USER_TOKEN', token, {
  //         path: '/',
  //         maxAge: 86400 * 7,
  //       })
  //       router.push('/')
  //     })
  // }

  return (
    <main style={{
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" alt="alurakut-logo" />

          <p>
            <strong>Conecte-se</strong>
            {' '}
            aos seus amigos e familiares usando recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong>
            {' '}
            novas pessoas através de amigos de seus amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong>
            {' '}
            seus vídeos, fotos e paixões em um só lugar
          </p>
        </section>

        <section className="formArea">
          <div className="box">

            <p>
              Acesse agora mesmo com seu usuário do
              {' '}
              <strong>GitHub</strong>
              !
            </p>
            <button
              type="button"
              onClick={handleSubmitLogin}
            >
              Login com github
            </button>
          </div>

          <footer className="box">
            <p>
              Ainda não é membro?
              {' '}
              <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
                </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br -
            {' '}
            <a href="/">Sobre o Orkut.br</a>
            {' '}
            -
            {' '}
            <a href="/">Centro de segurança</a>
            {' '}
            -
            {' '}
            <a href="/">Privacidade</a>
            {' '}
            -
            {' '}
            <a href="/">Termos</a>
            {' '}
            -
            {' '}
            <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
}
