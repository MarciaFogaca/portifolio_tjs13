const swiperWrapper = document.querySelector('.swiper-wrapper');
const formulario = document.querySelector('#formulario');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

async function getAboutGitHub() {
    try {
        const resposta = await fetch('https://api.github.com/users/MarciaFogaca');
        const perfil = await resposta.json();

        const seguidores = document.querySelector('.data-item:nth-child(1) .data-number');
        const repos      = document.querySelector('.data-item:nth-child(2) .data-number');
        const githubLink = document.querySelector('.about-buttons-data .botao');
        const avatar     = document.querySelector('.about-image img');

        if (seguidores) seguidores.textContent = perfil.followers;
        if (repos)      repos.textContent      = perfil.public_repos;
        if (githubLink) githubLink.href        = perfil.html_url;
        if (avatar)     avatar.src             = perfil.avatar_url;

    } catch (error) {
        console.error('Erro ao obter os dados do GitHub:', error);
    }
}

async function getProjectsGitHub() {
    try {
        const resposta = await fetch('https://api.github.com/users/MarciaFogaca/repos?sort=updated&per_page=10');
        const repositorios = await resposta.json();

        swiperWrapper.innerHTML = '';

        const linguagens = {
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'HTML': 'html',
            'CSS': 'css'
        };

        // FILTRO: Remove o repo do perfil e repositórios sem linguagem definida
        const repositoriosValidos = repositorios.filter(repo => {
            const nomeBaixo = repo.name.toLowerCase();
            return nomeBaixo !== 'marciafogaca' && repo.language !== null;
        });

        // Pegamos apenas os 6 primeiros após o filtro
        repositoriosValidos.slice(0, 6).forEach((repo) => {
            const linguagem = repo.language;
            const icone = linguagens[linguagem] || 'github'; // Fallback caso surja algo novo
            const urlIcone = `./assets/icons/languages/${icone}.svg`;

            const nome = repo.name.replace(/[-_]/g, ' ').toUpperCase();

            const descricao = repo.description
                ? (repo.description.length > 100 ? repo.description.substring(0, 100) + '...' : repo.description)
                : 'Projeto desenvolvido no GitHub';

            const tags = repo.topics?.length > 0
                ? repo.topics.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('')
                : `<span class="tag">${linguagem}</span>`;

            const deploy = repo.homepage
                ? `<a href="${repo.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
                : '';

            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <article class="projects-card">
                        <figure class="project-image">
                            <img src="${urlIcone}" alt="${linguagem}" />
                        </figure>
                        <div class="projects-content">
                            <h3>${nome}</h3>
                            <p>${descricao}</p>
                            <div class="project-tags">${tags}</div>
                            <div class="project-buttons">
                                <a href="${repo.html_url}" target="_blank" class="botao botao-sm">GitHub</a>
                                ${deploy}
                            </div>
                        </div>
                    </article>
                </div>`;
        });

        iniciarSwiper();

    } catch (error) {
        console.error('Erro ao buscar dados no GitHub:', error);
    }
}
function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
            769:  { slidesPerView: 2, spaceBetween: 20 },
            1025: { slidesPerView: 3, spaceBetween: 24 }
        }
    });
}

function validarNome() {
    const nome     = document.querySelector('#nome');
    const erroNome = document.querySelector('#erro-nome');
    if (!nome.value.trim()) {
        erroNome.textContent = '⚠️ Nome é obrigatório.';
    } else if (nome.value.trim().length < 3) {
        erroNome.textContent = '⚠️ Mínimo 3 caracteres.';
    } else {
        erroNome.textContent = '';
    }
}

function validarEmail() {
    const email     = document.querySelector('#email');
    const erroEmail = document.querySelector('#erro-email');
    if (!email.value.trim()) {
        erroEmail.textContent = '⚠️ E-mail é obrigatório.';
    } else if (!emailRegex.test(email.value)) {
        erroEmail.textContent = '⚠️ Digite um e-mail válido.';
    } else {
        erroEmail.textContent = '';
    }
}

formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;

    const nome     = document.querySelector('#nome');
    const email    = document.querySelector('#email');
    const assunto  = document.querySelector('#assunto');
    const mensagem = document.querySelector('#mensagem');

    if (!nome.value.trim() || nome.value.trim().length < 3) {
        document.querySelector('#erro-nome').textContent = '⚠️ Nome obrigatório (mín. 3 caracteres).';
        isValid = false;
    } else { document.querySelector('#erro-nome').textContent = ''; }

    if (!emailRegex.test(email.value)) {
        document.querySelector('#erro-email').textContent = '⚠️ E-mail inválido.';
        isValid = false;
    } else { document.querySelector('#erro-email').textContent = ''; }

    if (!assunto.value.trim()) {
        document.querySelector('#erro-assunto').textContent = '⚠️ Assunto é obrigatório.';
        isValid = false;
    } else { document.querySelector('#erro-assunto').textContent = ''; }

    if (!mensagem.value.trim()) {
        document.querySelector('#erro-mensagem').textContent = '⚠️ Mensagem é obrigatória.';
        isValid = false;
    } else { document.querySelector('#erro-mensagem').textContent = ''; }

    if (isValid) {
        window.location.href = 'success.html';
    }
});

// Inicializa
getAboutGitHub();
getProjectsGitHub();