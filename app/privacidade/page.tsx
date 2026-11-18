import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = { title: "Política de privacidade | EasyCred" };

export default function Privacidade() {
  return (
    <>
      <header className="topo">
        <div className="container topo__inner">
          <a href="/" aria-label="Voltar para a página inicial">
            <Logo />
          </a>
        </div>
      </header>
      <main className="texto-legal">
        <div className="container">
          <h1>Política de privacidade</h1>
          <p>
            Esta política explica como a EasyCred coleta e usa seus dados pessoais, de acordo com a Lei Geral de Proteção
            de Dados (Lei 13.709/2018).
          </p>

          <h2>Quais dados coletamos</h2>
          <p>Na consulta do site: nome, CPF e número de WhatsApp. No atendimento: os documentos que você enviar para o seu processo.</p>

          <h2>Para que usamos</h2>
          <p>
            Para consultar a situação do seu CPF a seu pedido, entrar em contato com você sobre o resultado e prestar os
            serviços que você contratar. A consulta só é feita quando você confirma que o CPF é seu.
          </p>

          <h2>Com quem compartilhamos</h2>
          <p>
            Apenas com os birôs de crédito e órgãos necessários para fazer a consulta ou executar o serviço contratado.
            Não vendemos seus dados.
          </p>

          <h2>Por quanto tempo guardamos</h2>
          <p>Pelo tempo necessário para o atendimento e para cumprir obrigações legais. Depois disso, os dados são apagados.</p>

          <h2>Seus direitos</h2>
          <p>
            Você pode pedir a qualquer momento acesso, correção ou exclusão dos seus dados, e retirar seu consentimento.
            Basta falar com a gente pelos canais de atendimento.
          </p>

          <p>
            <a href="/">Voltar para a página inicial</a>
          </p>
        </div>
      </main>
    </>
  );
}
