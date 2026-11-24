import Image from "next/image";
import { Contador } from "@/components/Contador";
import { Header } from "@/components/Header";
import { HeroShapes } from "@/components/HeroShapes";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Seta } from "@/components/Seta";
import { Spotlight } from "@/components/Spotlight";
import { Timeline } from "@/components/Timeline";
import { linkWhatsApp, site } from "@/lib/site";

const FAIXA = ["Aumento de rating", "Limpeza de CPF", "Limpeza de CNPJ", "Ação revisional", "Aumento de score", "Bacen", "Consulta completa"];

const PASSOS = [
  { titulo: "Você chama", texto: "Mande uma mensagem no WhatsApp contando a sua situação." },
  { titulo: "A gente analisa", texto: "Nossa equipe levanta todas as pendências e explica o seu caso sem enrolação." },
  { titulo: "Plano na mesa", texto: "Você recebe o caminho, o prazo e o valor antes de fechar qualquer coisa." },
  { titulo: "Acompanhamento", texto: "Cuidamos de cada etapa do seu processo e mantemos você informado até a conclusão." },
];

const DUVIDAS = [
  {
    p: "Como eu começo?",
    r: "Chame a gente no WhatsApp. Fazemos a consulta do seu CPF ou CNPJ, explicamos o que aparece no seu nome e mostramos o caminho.",
  },
  {
    p: "Consultar meu CPF baixa o meu score?",
    r: "Não. Consultar o próprio CPF não afeta o score.",
  },
  {
    p: "O que é rating?",
    r: "É a classificação de risco que os bancos atribuem a cada CPF e CNPJ, numa escala de AA a H. Trabalhamos o rating tanto de pessoa física quanto de empresas.",
  },
  {
    p: "O que é ação revisional?",
    r: "É um processo para revisar contratos de financiamento, empréstimo ou cartão quando há juros ou cobranças abusivas. Primeiro analisamos o seu contrato para ver se cabe a ação.",
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

function Triangulo() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="tri">
      <path d="M5 2.5 Q3.5 1.7 3.5 3.5 L3.5 16.5 Q3.5 18.3 5 17.5 L17 11 Q18.3 10 17 9 Z" />
    </svg>
  );
}

function Faixa({ invertida = false }: { invertida?: boolean }) {
  const itens = [...FAIXA, ...FAIXA];
  return (
    <div className={`faixa${invertida ? " faixa--invertida" : ""}`} aria-hidden="true">
      <div className="faixa__trilho">
        {[0, 1].map((k) => (
          <div className="faixa__grupo" key={k}>
            {itens.map((t, i) => (
              <span key={i}>
                {t}
                <Triangulo />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="pular" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <Reveal />
      <Spotlight />

      <main id="conteudo">
        {/* ---------------- HERO ---------------- */}
        <section className="hero">
          <div className="hero__pontos" aria-hidden="true" />
          <HeroShapes />
          <div className="container hero__grid">
            <div className="hero__texto">
              <p className="pilula">
                <span className="ponto-vivo" aria-hidden="true" />
                Atendemos todo o Brasil
              </p>
              <h1 className="hero__titulo">
                <span className="adesivo">Limpe seu nome.</span>
                <span className="adesivo adesivo--azul">Resolva suas pendências.</span>
              </h1>
              <p className="hero__lead">
                A EasyCred cuida do seu CPF e do CNPJ da sua empresa: aumento de rating, limpeza de nome, ação revisional,
                score e pendências no Bacen. Tudo pelo WhatsApp, sem sair de casa.
              </p>
              <div className="hero__acoes">
                <a className="btn" href={linkWhatsApp("Olá! Quero limpar meu nome.")} target="_blank" rel="noopener noreferrer">
                  <span>Quero limpar meu nome</span>
                  <Seta />
                </a>
                <a className="btn btn--vidro" href="#servicos">
                  <span>Ver serviços</span>
                </a>
              </div>
              <dl className="hero__numeros">
                <div>
                  <dt>seguidores no Instagram</dt>
                  <dd>
                    <Contador valor={25} sufixo=" mil" />
                  </dd>
                </div>
                <div>
                  <dt>estados e DF atendidos</dt>
                  <dd>
                    <Contador valor={27} />
                  </dd>
                </div>
                <div>
                  <dt>pessoa física e empresa</dt>
                  <dd>CPF e CNPJ</dd>
                </div>
              </dl>
            </div>
            <div className="hero__foto">
              <div className="hero__aura" aria-hidden="true" />
              <Image
                src="/dono.webp"
                alt="Fundador da EasyCred apontando para a câmera"
                width={1601}
                height={2682}
                sizes="(min-width: 1000px) 460px, 270px"
                priority
                className="hero__pessoa"
              />
              <div className="selo selo--1" aria-hidden="true">
                <span className="selo__icone selo__icone--verde">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <span>
                  <b>Limpeza de nome</b>
                  <small>CPF e CNPJ</small>
                </span>
              </div>
              <div className="selo selo--2" aria-hidden="true">
                <span className="selo__icone">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 17l5-5 4 3 7-8M15 7h5v5" />
                  </svg>
                </span>
                <span>
                  <b>Aumento de rating</b>
                  <small>pessoa física e jurídica</small>
                </span>
              </div>
              <div className="selo selo--3" aria-hidden="true">
                <span className="selo__icone selo__icone--logo">
                  <Logo altura={30} />
                </span>
                <span>
                  <b>@easycredrr</b>
                  <small>25 mil seguidores</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="faixas">
          <Faixa />
          <Faixa invertida />
        </div>

        {/* ---------------- SERVIÇOS ---------------- */}
        <section className="servicos" id="servicos" aria-labelledby="servicos-titulo">
          <div className="container">
            <div className="secao__cabeca" data-reveal>
              <h2 id="servicos-titulo" className="secao__titulo">
                Serviços para você e para a sua empresa.
              </h2>
              <p>Do nome negativado ao contrato com juros abusivos. Cada caso é analisado antes de qualquer contratação.</p>
            </div>

            <div className="bento">
              <article className="card spot card--rating" data-reveal>
                <div className="card__topo">
                  <div className="card__tags">
                    <span className="card__tag">Pessoa física</span>
                    <span className="card__tag">Pessoa jurídica</span>
                  </div>
                  <h3>Aumento de rating</h3>
                  <p>
                    Rating é a nota de risco que os bancos dão ao seu CPF ou CNPJ, numa escala que vai de AA a H. A gente
                    analisa o que está pesando na sua classificação e trabalha para melhorá-la, para você e para a sua
                    empresa.
                  </p>
                </div>
                <div className="escala" aria-hidden="true">
                  {["AA", "A", "B", "C", "D", "E", "F", "G", "H"].map((n, i) => (
                    <span key={n} className={`escala__nivel escala__nivel--${i}`}>
                      {n}
                    </span>
                  ))}
                  <span className="escala__marcador" />
                </div>
                <div className="card__acoes">
                  <a
                    className="btn btn--branco"
                    href={linkWhatsApp("Olá! Quero saber sobre o aumento de rating do meu CPF.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Rating do meu CPF</span>
                    <Seta />
                  </a>
                  <a
                    className="btn btn--vidro-claro"
                    href={linkWhatsApp("Olá! Quero saber sobre o aumento de rating da minha empresa.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Rating da empresa</span>
                  </a>
                </div>
              </article>

              <article className="card spot card--limpeza" data-reveal>
                <div className="card__topo">
                  <span className="card__tag">CPF e CNPJ</span>
                  <h3>Limpeza de nome</h3>
                  <p>Trabalhamos para retirar as restrições do seu CPF ou CNPJ nos órgãos de proteção, como Serasa, SPC e Boa Vista.</p>
                </div>
                <div className="cpf-card" aria-hidden="true">
                  <div className="cpf-card__linha">
                    <span className="cpf-card__avatar" />
                    <span>
                      <b>Situação do CPF</b>
                      <small>***.482.***-09</small>
                    </span>
                  </div>
                  <div className="cpf-card__status">
                    <span className="st st--antes">Negativado</span>
                    <span className="st st--depois">Nome limpo</span>
                  </div>
                </div>
                <a className="card__link" href={linkWhatsApp("Olá! Quero limpar meu nome.")} target="_blank" rel="noopener noreferrer">
                  Quero limpar meu nome <Seta />
                </a>
              </article>

              <article className="card spot" data-reveal>
                <div className="card__topo">
                  <span className="card__tag">Pessoa física</span>
                  <h3>Aumento de score</h3>
                  <p>Analisamos seu cadastro e seu histórico e cuidamos do que pode estar puxando o seu score para baixo.</p>
                </div>
                <a className="card__link" href={linkWhatsApp("Olá! Quero saber sobre o aumento de score.")} target="_blank" rel="noopener noreferrer">
                  Falar sobre score <Seta />
                </a>
              </article>

              <article className="card spot" data-reveal>
                <div className="card__topo">
                  <span className="card__tag">Registrato e SCR</span>
                  <h3>Bacen</h3>
                  <p>Atuamos em apontamentos no Banco Central que continuam aparecendo mesmo com o nome limpo.</p>
                </div>
                <a
                  className="card__link"
                  href={linkWhatsApp("Olá! Tenho pendência no Bacen e quero ajuda.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar sobre Bacen <Seta />
                </a>
              </article>

              <article className="card spot card--revisional" data-reveal>
                <div className="card__topo">
                  <span className="card__tag">Contratos e juros</span>
                  <h3>Ação revisional</h3>
                  <p>
                    Analisamos seus contratos de financiamento, empréstimo ou cartão. Se houver juros ou cobranças abusivas,
                    entramos com a ação para revisar os valores, com apoio jurídico.
                  </p>
                </div>
                <a
                  className="card__link"
                  href={linkWhatsApp("Olá! Quero saber sobre ação revisional.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Analisar meu contrato <Seta />
                </a>
              </article>

              <article className="card spot card--consulta" data-reveal>
                <div className="card__topo">
                  <span className="card__tag">CPF e CNPJ</span>
                  <h3>Consulta completa</h3>
                  <p>Levantamos tudo o que aparece no seu nome para você saber exatamente o que precisa ser resolvido.</p>
                </div>
                <a
                  className="btn"
                  href={linkWhatsApp("Olá! Quero uma consulta completa do meu CPF/CNPJ.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Pedir minha consulta</span>
                  <Seta />
                </a>
              </article>
            </div>
          </div>
        </section>

{/* ---------------- COMO FUNCIONA ---------------- */}
        <section className="passos" id="como-funciona" aria-labelledby="passos-titulo">
          <div className="container">
            <div className="secao__cabeca" data-reveal>
              <h2 id="passos-titulo" className="secao__titulo">
                Do primeiro contato à conclusão em 4 passos.
              </h2>
            </div>
            <Timeline passos={PASSOS} />
          </div>
        </section>

        {/* ---------------- INSTAGRAM ---------------- */}
        <section className="insta" aria-labelledby="insta-titulo">
          <div className="container">
            <div className="insta__painel" data-reveal>
              <div className="insta__texto">
                <h2 id="insta-titulo" className="secao__titulo">
                  Nossos clientes contam como foi no Instagram.
                </h2>
                <p>Os feedbacks dos nossos clientes ficam nos destaques do @easycredrr, com prints e vídeos reais.</p>
                <a className="btn" href={site.instagram} target="_blank" rel="noopener noreferrer">
                  <span>Ver feedbacks</span>
                  <Seta />
                </a>
              </div>
              <div className="insta__perfil" aria-hidden="true">
                <div className="insta__avatar">
                  <Logo altura={84} />
                </div>
                <b>@easycredrr</b>
                <div className="insta__nums">
                  <span>
                    <strong>25 mil</strong>seguidores
                  </span>
                  <span>
                    <strong>250+</strong>publicações
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- DÚVIDAS ---------------- */}
        <section className="duvidas" id="duvidas" aria-labelledby="duvidas-titulo">
          <div className="container duvidas__grid">
            <div data-reveal>
              <h2 id="duvidas-titulo" className="secao__titulo">
                Dúvidas comuns
              </h2>
              <p className="duvidas__sub">Não achou sua resposta? Chama no WhatsApp que a gente explica.</p>
            </div>
            <div className="duvidas__lista">
              {DUVIDAS.map((d) => (
                <details key={d.p} className="duvida">
                  <summary>
                    {d.p}
                    <span className="duvida__mais" aria-hidden="true" />
                  </summary>
                  <p>{d.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CTA FINAL ---------------- */}
        <section className="final">
          <div className="container">
            <div className="final__painel" data-reveal>
              <HeroShapes />
              <h2 className="final__titulo">
                <span className="adesivo">Limpe seu nome.</span>
              </h2>
              <p>Chame a gente no WhatsApp e entenda o que dá para fazer no seu caso.</p>
              <div className="hero__acoes">
                <a className="btn btn--branco" href={linkWhatsApp("Olá! Quero limpar meu nome.")} target="_blank" rel="noopener noreferrer">
                  <span>Quero limpar meu nome</span>
                  <Seta />
                </a>
                <a className="btn btn--vidro-claro" href={linkWhatsApp()} target="_blank" rel="noopener noreferrer">
                  <span>Falar no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="rodape">
        <div className="container rodape__inner">
          <Logo altura={64} />
          <nav aria-label="Rodapé" className="rodape__links">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer">
              WhatsApp {site.whatsappExibicao}
            </a>
            <a href="/privacidade">Política de privacidade</a>
          </nav>
          <p className="rodape__legal">
            © {new Date().getFullYear()} EasyCred. Todos os direitos reservados.
            <br />
            {site.razaoSocial}, CNPJ {site.cnpj}, {site.cidade}
          </p>
        </div>
      </footer>

      <a className="whats-flutuante" href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.4 10.4 0 0 1-1.7-5.7C5.1 9.9 10 5.2 16 5.2s10.9 4.7 10.9 10.6S22 26.4 16 26.4zm6-7.9c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2l-1 1.3c-.2.2-.4.3-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.700-2-1.9-2.3-.2-.3 0-.5.1-.7l.5-.6.3-.5v-.5l-1-2.5c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.200-1.2 2.900s1.2 3.400 1.4 3.600c.2.2 2.4 3.7 5.9 5.1 2.9 1.1 3.5.9 4.1.8.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.7-.5z"
          />
        </svg>
      </a>
    </>
  );
}
