import React, { useEffect, useState } from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import ProfileRelationsBoxWrapper from '../src/components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSidebar(propriedades) {
  const { githubUser } = propriedades
  return (
    <Box>
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: '8px' }}
        alt="github profile"
      />
    </Box>
  )
}

export default function Home() {
  const [pessoasFavoritas, setPessoasFavoritas] = useState('')
  const usuarioAleatorio = 'SrTonn'

  useEffect(() => {
    fetch(`https://api.github.com/users/${usuarioAleatorio}/following`)
      .then((response) => response.json())
      .then((data) => {
        setPessoasFavoritas(data.map((item) => item.login).sort(() => Math.random() - 0.5))
      })
  }, [])

  function random(min, max) {
    if (max === undefined) {
      // eslint-disable-next-line no-param-reassign
      max = min
      // eslint-disable-next-line no-param-reassign
      min = 0
    }
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem-vindo(a),
              <br />
              {usuarioAleatorio}
            </h1>
            <OrkutNostalgicIconSet
              recados={random(100)}
              fotos={Math.floor(random(30, 100))}
              videos={Math.floor(random(100))}
              fas={Math.floor(random(100))}
              mensagens={Math.floor(random(10, 100))}
              confiavel={random(3)}
              legal={random(3)}
              sexy={random(3)}
            />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade (
              {pessoasFavoritas.length}
              )
            </h2>

            <ul>
              {pessoasFavoritas
                && pessoasFavoritas.map((itemAtual, i) => (i > 5 ? false : (
                  <li key={itemAtual}>
                    <a
                      href={`https://github.com/${itemAtual}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={`https://github.com/${itemAtual}.png`}
                        alt="img"
                      />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
