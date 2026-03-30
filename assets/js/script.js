// Seção About
const about= document.queryselestor('.about');

// Seção Projects
const swiperWrapper = document.querySelector('.swiper-wrapper');

// Formulário
const formulario= document.querySelector('aformulario');

// Função de preenchimento da seção about
async function getAboutGithub() {

    try {

        // Requisição do tipo GET para a API do GitHub
        const response = await fetch('https://github.com/MarciaFogaca?tab=repositories);
         
        //Converte resposta para JSON
        const perfil = await resposta.json();

        about.innerHTML = '';

        about.innerHTML = `

        <!-- Seção About -->
      <section id="about" class="section-container about-container">


        <!-- Imagem da Seção About -->
        <figure class="about-image">
          <img src="${perfil.avatar_url}"
            alt="Foto de perfil da Márcia Telles"
         
        >
        </figure>


        <!-- Conteúdo da Seção About -->
        <article class="about-content">


          <h2>Sobre Mim</h2>
          <p>Trago da minha trajetória profissional a disciplina e a precisão
            técnica. Com uma sólida experiência como técnica certificada Apple,
            decidi unir minhas habilidades em resolução de problemas com a
            paixão pela tecnologia.</p>
          <p>
            Atualmente, estou em transição de carreira como
            <strong>Desenvolvedora Full Stack Junior</strong>. Estou mergulhada
            no ecossistema <strong>NestJS, TypeScript e MySQL</strong>,
            desenvolvendo soluções reais como o app de delivery
            <strong>Friendly Food</strong> e projetos de CRM sustentáveis como o
            <strong>GreenTech CRM</strong>. </p>
          <p>
            Meu foco é aplicar a lógica de programação para criar aplicações
            escaláveis, organizadas e que tragam impacto real para os negócios! </p>
   
            <!-- Links (GitHub + Curriculo) e Dados do GitHub -->
          <div class="about-buttons-data">
           
            <!-- Links -->
            <div class="buttons-container">
            <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
            <a href="#" target="_blank" class="botao-outline">Currículo</a>
          </div>


          <!-- Dados do GitHub -->
          <div class="data-container">


               <!-- Nº de Seguidores -->
            <div class="data-item">
              <span class="data-number">${perfil.followers}</span>
              <span class="data-label">Seguidores</span>
            </div>


         
            <!-- Nº de Repositórios Públicos -->
            <div class="data-item">
              <span class="data-number">${perfil.public_repos}</span>
              <span class="data-label">Repositórios</span>
            </div>


          </div>


        </div>
      </article>
     

        
    } catch (error) {
            console.error('Erro ao obter os dados do GitHub:', error);
        
    }
}

