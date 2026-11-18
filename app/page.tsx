import { ConsultaScore } from "@/components/ConsultaScore";
import { Logo } from "@/components/Logo";
import { linkWhatsApp, site } from "@/lib/site";

const SERVICOS = [
  {
    titulo: "Limpeza de nome",
    alvo: "CPF e CNPJ",
    texto: "Tiramos as restrições do seu nome nos órgãos de proteção ao crédito para você voltar a comprar, financiar e abrir conta.",
    msg: "Olá! Quero limpar meu nome.",
  },
  {
    titulo: "Aumento de score",
    alvo: "Pessoa física",
    texto: "Organizamos seu cadastro e seu histórico para o score subir e o banco aprovar o seu crédito.",
    msg: "Olá! Quero aumentar meu score.",
  },
  {
    titulo: "Aumento de rating",
    alvo: "Empresas",
    texto: "Melhoramos a nota da sua empresa nos bancos para liberar capital de giro, limite e financiamento.",
    msg: "Olá! Quero melhorar o rating da minha empresa.",
  },
  {
    titulo: "Bacen",
    alvo: "Registrato e SCR",
    texto: "Resolvemos apontamentos no Banco Central que travam empréstimos, mesmo com o nome limpo no Serasa.",
    msg: "Olá! Tenho pendência no Bacen e quero ajuda.",
  },
  {
    titulo: "Consulta completa",
    alvo: "CPF e CNPJ",
    texto: "Levantamos tudo o que aparece no seu nome para você saber exatamente o que precisa ser resolvido.",
    msg: "Olá! Quero uma consulta completa do meu CPF/CNPJ.",
  },
];

const PASSOS = [
  { titulo: "Você consulta", texto: "Faça a consulta grátis aqui no site ou chame a gente no WhatsApp." },
  { titulo: "A gente analisa", texto: "Nossa equipe levanta todas as pendências e explica o seu caso sem enrolação." },
  { titulo: "Plano na mesa", texto: "Você recebe o caminho, o prazo e o valor antes de fechar qualquer coisa." },
  { titulo: "Nome limpo", texto: "Acompanhamos até o fim e avisamos quando o seu crédito estiver liberado." },
];

const DUVIDAS = [
  {
    p: "A consulta do site é grátis?",
    r: "Sim. Você vê seu score e se tem pendências sem pagar nada e sem compromisso.",
  },
  {
    p: "Consultar meu CPF baixa o meu score?",
    r: "Não. Consultar o próprio CPF não afeta o score. O que pesa são pedidos de crédito feitos em excesso.",
  },
  {
    p: "Vocês atendem fora de Roraima?",
    r: "Sim, atendemos todo o Brasil. O atendimento é feito pelo WhatsApp e os documentos são enviados de forma digital.",
  },
  {
    p: "Quanto tempo leva para limpar o nome?",
    r: "Depende do tipo e da quantidade de pendências. Depois da análise, você recebe o prazo do seu caso antes de fechar.",
  },
  {
    p: "Meus dados ficam seguros?",
    r: "Sim. Usamos seus dados só para consultar e atender você, seguindo a LGPD. Não vendemos nem compartilhamos com terceiros.",
  },
];

export default function Home() {
  return (
    <>
      <a className="pular" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="topo">
        <div className="container topo__inner">
          <a href="/" aria-label="EasyCred, página inicial">
            <Logo />
          </a>
          <nav className="topo__nav" aria-label="Principal">
            <a href="#servicos">Serviços</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <a className="botao botao--pequeno" href={linkWhatsApp()} target="_blank" rel="noopener noreferrer">
            Falar no WhatsApp
          </a>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero">
          <div className="container hero__grid">
            <div className="hero__texto">
              <p className="hero__selo">Atendemos todo o Brasil</p>
              <h1 className="hero__titulo">
                Seu nome limpo.
                <br />
                Seu crédito de volta.
              </h1>
              <p className="hero__lead">
                Descubra em segundos se o seu nome está negativado e quanto está o seu score. Depois, a EasyCred resolve
                com você: limpeza de CPF e CNPJ, score, rating e Bacen.
              </p>
              <a className="botao botao--cheio hero__atalho" href="#consulta">
                Consultar meu CPF grátis
              </a>
              <ul className="hero__provas">
                <li>
                  <strong>25 mil</strong> pessoas acompanham a gente no Instagram
                </li>
                <li>
                  <strong>CPF e CNPJ</strong> pessoa física e empresa
                </li>
              </ul>
            </div>
            <ConsultaScore />
          </div>
        </section>

        <section className="servicos" id="servicos" aria-labelledby="servicos-titulo">
          <div className="container">
            <h2 id="servicos-titulo" className="secao__titulo">
              O que a EasyCred resolve
            </h2>
            <ul className="servicos__lista">
              {SERVICOS.map((s) => (
                <li key={s.titulo} className="servico">
                  <div className="servico__cabeca">
                    <h3>{s.titulo}</h3>
                    <span className="servico__alvo">{s.alvo}</span>
                  </div>
                  <p>{s.texto}</p>
                  <a href={linkWhatsApp(s.msg)} target="_blank" rel="noopener noreferrer" className="servico__link">
                    Falar sobre isso
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="passos" id="como-funciona" aria-labelledby="passos-titulo">
          <div className="container">
            <h2 id="passos-titulo" className="secao__titulo secao__titulo--claro">
              Como funciona
            </h2>
            <ol className="passos__lista">
              {PASSOS.map((p, i) => (
                <li key={p.titulo} className="passo">
                  <span className="passo__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="feedbacks" aria-labelledby="feedbacks-titulo">
          <div className="container feedbacks__inner">
            <div>
              <h2 id="feedbacks-titulo" className="secao__titulo">
                Quem já voltou a ter crédito conta como foi
              </h2>
              <p>Os feedbacks dos nossos clientes estão nos destaques do Instagram, com prints e vídeos reais.</p>
            </div>
            <a className="botao botao--contorno" href={site.instagram} target="_blank" rel="noopener noreferrer">
              Ver feedbacks no Instagram
            </a>
          </div>
        </section>

        <section className="duvidas" id="duvidas" aria-labelledby="duvidas-titulo">
          <div className="container duvidas__grid">
            <h2 id="duvidas-titulo" className="secao__titulo">
              Dúvidas comuns
            </h2>
            <div className="duvidas__lista">
              {DUVIDAS.map((d) => (
                <details key={d.p} className="duvida">
                  <summary>{d.p}</summary>
                  <p>{d.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final">
          <div className="container final__inner">
            <h2>Comece pela consulta. É grátis e leva menos de um minuto.</h2>
            <div className="final__acoes">
              <a className="botao botao--branco" href="#consulta">
                Consultar meu CPF
              </a>
              <a className="botao botao--contorno-claro" href={linkWhatsApp()} target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="rodape">
        <div className="container rodape__inner">
          <Logo claro />
          <nav aria-label="Rodapé" className="rodape__links">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={site.linktree} target="_blank" rel="noopener noreferrer">
              Contatos
            </a>
            <a href="/privacidade">Política de privacidade</a>
          </nav>
          <p className="rodape__legal">© {new Date().getFullYear()} EasyCred. Todos os direitos reservados.</p>
        </div>
      </footer>

      <a className="whats-flutuante" href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.4 10.4 0 0 1-1.7-5.7C5.1 9.9 10 5.2 16 5.2s10.9 4.7 10.9 10.6S22 26.4 16 26.4zm6-7.9c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2l-1 1.3c-.2.2-.4.3-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7l.5-.6.3-.5v-.5l-1-2.5c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.1 2.9 1.1 3.5.9 4.1.8.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.7-.5z"
          />
        </svg>
      </a>
    </>
  );
}
