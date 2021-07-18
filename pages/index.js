import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import ProfileRelationsBoxWrapper from '../src/components/ProfileRelations'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSidebar(propriedades) {
  const { githubUser } = propriedades
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: '8px' }}
        alt="github profile"
      />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @
          {githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox({
  title, items, githubUser,
}) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title}
        {' '}
        (
        <a
          href={`https://github.com/${githubUser}?tab=${items[1]}`}
          target="_blank"
          rel="noreferrer"
          className="boxLink"
        >

          {items[0].length}
        </a>
        )
      </h2>

      <ul>
        {items[0]
        && items[0].map((item, i) => (i > 5 ? false : (
          <li key={item}>
            <a
              href={`https://github.com/${item}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`https://github.com/${item}.png`}
                alt="img"
              />
              <span>{item}</span>
            </a>
          </li>
        )))}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

ProfileRelationsBox.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.instanceOf(Array).isRequired,
  githubUser: PropTypes.string.isRequired,
}

export default function Home() {
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const img404 = 'https://image.freepik.com/vetores-gratis/erro-404-nao-encontrado-efeito-de-falha_8024-4.jpg'
  const [communities, setCommunities] = useState([{
    id: 'Eu odeio acordar cedo',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
  }, {
    id: 'Só mais 5 minutinhos',
    title: 'Só mais 5 minutinhos',
    image: 'https://pic1.zhimg.com/50/c9030d530ffa00e8d9431c29bd648b66_hd.jpg?source=1940ef5c',
  }, {
    id: 'Queria sorvete, mas era feijão',
    title: 'Queria sorvete, mas era feijão',
    image: 'http://1.bp.blogspot.com/_E_Skfy6CIeY/S83eZkqfohI/AAAAAAAAAqE/0W_V-2UYy38/s1600/pote_negresco.jpg',
  }, {
    id: 'Tocava e corria',
    title: 'Tocava e corria',
    image: 'https://www.pezzi.com.br/storage/images/HPGPuTqV8kJlqhqz0ZMOpi6FlElkuYtuGdnWx7VX.png',
  }, {
    id: 'Deus me disse: desce e arrasa!',
    title: 'Deus me disse: desce e arrasa!',
    image: 'http://4.bp.blogspot.com/_KtNRZTGIxtE/SsTk3hETTsI/AAAAAAAAAAc/EViMRjrgENY/s320/Deus+me+disse...jpg',
  }, {
    id: 'Eu abro a geladeira pra pensar',
    title: 'Eu abro a geladeira pra pensar',
    image: 'https://i.pinimg.com/736x/70/8e/e0/708ee0b3268da6a20ffb05fd88d272fe.jpg',
  }])
  const githubUser = 'SrTonn'

  useEffect(() => {
    // fetch followers
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((response) => {
        if (response.ok) return response.json()

        throw new Error(response.status)
      })
      .then((data) => {
        setFollowers(data.map((item) => item.login)
          .sort(() => Math.random() - 0.5))
      })
      .catch((err) => {
        console.error(`Erro (${err}) ao carregar ${githubUser}/followers`)
      })

    // fetch following
    fetch(`https://api.github.com/users/${githubUser}/following`)
      .then((response) => {
        if (response.ok) return response.json()

        throw new Error(response.status)
      })
      .then((data) => {
        setFollowing(data.map((item) => item.login)
          .sort(() => Math.random() - 0.5))
      })
      .catch((err) => {
        console.error(`Erro (${err}) ao carregar ${githubUser}/following`)
      })

    // API GraphQL DATOCMS
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: process.env.DATOCMS_API_TOKEN,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query:
        `
      query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }`,
      }),
    }).then((response) => response.json())
      .then((data) => {
        const newCommunities = data.data.allCommunities.sort(() => Math.random() - 0.5)
        setCommunities([...newCommunities])
      })

    const newCommunities = communities.sort(() => Math.random() - 0.5)
    setCommunities([...newCommunities])
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

  function handleCreateCommunity(e) {
    e.preventDefault()
    const dadosDoForm = new FormData(e.target)

    // console.log('Campo: ', dadosDoForm.get('title'))
    // console.log(dadosDoForm.get('image') === '')

    const community = {
      id: new Date().toISOString(),
      title: dadosDoForm.get('title'),
      image: dadosDoForm.get('image') === '' ? img404 : dadosDoForm.get('image'),
    }

    const updatedCommunities = [community, ...communities]
    setCommunities(updatedCommunities)
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem-vindo(a),
              {' '}
              {githubUser}
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

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={handleCreateCommunity}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>

              <div>
                <input
                  placeholder="Cole uma URL para usarmos de capa"
                  name="image"
                  aria-label="Cole uma URL para usarmos de capa"
                />
              </div>
              <button type="submit">
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBox
            title="Seguidores"
            items={[followers, 'followers']}
            githubUser={githubUser}
          />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades  (
              {communities.length}
              )
            </h2>

            <ul>
              {communities.map((item, i) => (i > 5 ? false : (
                <li key={item.id}>
                  <a href={`/users/${item.title}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                    />
                    <span>{item.title}</span>
                  </a>
                </li>
              )))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox
            title="Seguindo"
            items={[following, 'following']}
            githubUser={githubUser}
          />

        </div>
      </MainGrid>
    </>
  )
}
