// DARK MODE

const themeToggle = document.querySelector('#theme-toggle')

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode')
  if (themeToggle) themeToggle.textContent = '☀️'
}

// Alternar dark/light mode ao clicar no botão
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')

    if (document.body.classList.contains('dark-mode')) {
      themeToggle.textContent = '☀️'
      localStorage.setItem('theme', 'dark')
    } else {
      themeToggle.textContent = '🌙'
      localStorage.setItem('theme', 'light')
    }
  })
}

// SEÇÃO ABOUT

const about = document.querySelector('#about')

async function getAboutGitHub() {
  if (!about) return

  try {
    const resposta = await fetch('https://api.github.com/users/MarciaFogaca')
    const perfil = await resposta.json()

    about.innerHTML = ''

    about.innerHTML = `

      <!-- Imagem da Seção About -->
      <figure class="about-image">
        <img
          src="${perfil.avatar_url}"
          alt="${perfil.name || 'Márcia Telles'}"
        />
      </figure>

      <!-- Conteúdo da Seção About -->
      <article class="about-content">

        <h2>Sobre Mim</h2>

        <p>
          Trago da minha trajetória profissional a disciplina e a precisão
          técnica. Com uma sólida experiência como técnica certificada Apple,
          decidi unir minhas habilidades em resolução de problemas com a
          paixão pela tecnologia.
        </p>
        <p>
          Atualmente, estou em transição de carreira como
          <strong>Desenvolvedora Full Stack Junior</strong>. Estou mergulhada
          no ecossistema <strong>NestJS, TypeScript e MySQL</strong>,
          desenvolvendo soluções reais como o app de delivery
          <strong>Friendly Food</strong> e projetos de CRM sustentáveis como o
          <strong>GreenTech CRM</strong>.
        </p>
        <p>
          Meu foco é aplicar a lógica de programação para criar aplicações
          escaláveis, organizadas e que tragam impacto real para os negócios!
        </p>

        <!-- Links e Dados do GitHub -->
        <div class="about-buttons-data">

          <!-- Botões -->
          <div class="buttons-container">
            <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
            <a href="./assets/docs/curriculo_marcia_fogaca.pdf" download class="botao-outline">Currículo</a>
          </div>

          <!-- Dados do GitHub -->
          <div class="data-container">

            <div class="data-item">
              <span class="data-number">${perfil.followers}</span>
              <span class="data-label">Seguidores</span>
            </div>

            <div class="data-item">
              <span class="data-number">${perfil.public_repos}</span>
              <span class="data-label">Repositórios</span>
            </div>

          </div>

        </div>
      </article>

    `
  } catch (error) {
    console.error('Erro ao buscar dados no GitHub:', error)
  }
}

// SEÇÃO PROJECTS 

const swiperWrapper = document.querySelector('.swiper-wrapper')

async function getProjectsGitHub() {
  if (!swiperWrapper) return

  try {
    const resposta = await fetch(
      'https://api.github.com/users/MarciaFogaca/repos?sort=pushed&per_page=6'
    )
    const repositorios = await resposta.json()

    swiperWrapper.innerHTML = ''

    // Mapa de ícones por linguagem
    const linguagens = {
      JavaScript: 'javascript',
      TypeScript: 'typescript',
      Python: 'python',
      Java: 'java',
      HTML: 'html',
      CSS: 'css',
      PHP: 'php',
      'C#': 'csharp',
      Go: 'go',
      Kotlin: 'kotlin',
      Swift: 'swift',
      C: 'c',
      'C++': 'c_plus',
      GitHub: 'github',
    }

    repositorios.forEach((repositorio) => {

      const linguagem = repositorio.language || 'GitHub'
      const icone = linguagens[linguagem] ?? linguagens['GitHub']
      const urlIcone = `./assets/icons/languages/${icone}.svg`

      const nomeFormatado = repositorio.name
        .replace(/[-_]/g, ' ')
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+t[a-z0-9]+$/i, '')
        .toUpperCase()

      const truncar = (texto, limite) =>
        texto.length > limite ? texto.substring(0, limite) + '...' : texto

      const descricao = repositorio.description
        ? truncar(repositorio.description, 100)
        : 'Projeto desenvolvido no GitHub'

      const tags =
        repositorio.topics?.length > 0
          ? repositorio.topics
              .slice(0, 3)
              .map((topic) => `<span class="tag">${topic}</span>`)
              .join('')
          : `<span class="tag">${linguagem}</span>`

      // Botão Deploy (opcional)
      const botaoDeploy = repositorio.homepage
        ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
        : ''

      // Botões de ação
      const botoesAcao = `
        <div class="project-buttons">
          <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
            GitHub
          </a>
          ${botaoDeploy}
        </div>
      `

      // Monta o card
      swiperWrapper.innerHTML += `

        <div class="swiper-slide">
          <article class="project-card">

            <figure class="project-image">
              <img
                src="${urlIcone}"
                alt="Ícone - ${linguagem} - Linguagem principal do projeto"
              />
            </figure>

            <div class="project-content">
              <h3>${nomeFormatado}</h3>
              <p>${descricao}</p>

              <div class="project-tags">
                ${tags}
              </div>

              ${botoesAcao}
            </div>

          </article>
        </div>

      `
    })

    iniciarSwiper()
  } catch (error) {
    console.error('Erro ao buscar projetos no GitHub:', error)
  }
}

// SWIPER — inicializa o carrossel de projetos

function iniciarSwiper() {
  new Swiper('.projects-swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 24,
    centeredSlides: false,
    loop: true,
    watchOverflow: true,

    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 40,
        centeredSlides: false,
      },
      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 40,
        centeredSlides: false,
      },
      1025: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 54,
        centeredSlides: false,
      },
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },

    grabCursor: true,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
  })
}

// FORMULÁRIO — validação antes de enviar

const formulario = document.querySelector('#formulario')

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

if (formulario) {
  formulario.addEventListener('submit', function (event) {
    event.preventDefault()

    document
      .querySelectorAll('form span')
      .forEach((span) => (span.innerHTML = ''))

    let isValid = true

    const nome = document.querySelector('#nome')
    const erroNome = document.querySelector('#erro-nome')

    if (nome.value.trim().length < 3) {
      erroNome.innerHTML = 'O nome deve ter no mínimo 3 caracteres'
      if (isValid) nome.focus()
      isValid = false
    }

    const email = document.querySelector('#email')
    const erroEmail = document.querySelector('#erro-email')

    if (!email.value.trim().match(emailRegex)) {
      erroEmail.innerHTML = 'Digite um endereço de e-mail válido'
      if (isValid) email.focus()
      isValid = false
    }

    const assunto = document.querySelector('#assunto')
    const erroAssunto = document.querySelector('#erro-assunto')

    if (assunto.value.trim().length < 5) {
      erroAssunto.innerHTML = 'O assunto deve ter no mínimo 5 caracteres'
      if (isValid) assunto.focus()
      isValid = false
    }

    const mensagem = document.querySelector('#mensagem')
    const erroMensagem = document.querySelector('#erro-mensagem')

    if (mensagem.value.trim().length === 0) {
      erroMensagem.innerHTML = 'A mensagem não pode ser vazia'
      if (isValid) mensagem.focus()
      isValid = false
    }

    if (isValid) {
      const submitButton = formulario.querySelector('button[type="submit"]')
      submitButton.disabled = true
      submitButton.textContent = 'Enviando...'
      formulario.submit()
    }
  })
}

// INICIALIZAÇÃO — executa as funções ao carregar a página

getAboutGitHub()
getProjectsGitHub()