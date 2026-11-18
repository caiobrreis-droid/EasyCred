import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { linkWhatsApp, site } from "@/lib/site";

export const metadata: Metadata = { title: "Política de privacidade | EasyCred" };

export default function Privacidade() {
  return (
    <>
      <Header />
      <main className="texto-legal">
        <div className="container">
          <h1>Política de privacidade</h1>
          <p>
            Esta política explica como a EasyCred coleta e usa seus dados pessoais, de acordo com a Lei Geral de Proteção
            de Dados (Lei 13.709/2018).
          </p>

          <h2>Quem é o responsável pelos seus dados</h2>
          <p>
            {site.razaoSocial} (EasyCred), CNPJ {site.cnpj}, com sede em {site.cidade}. Contato pelo WhatsApp{" "}
            <a href={linkWhatsApp("Olá! Tenho uma dúvida sobre meus dados pessoais.")} target="_blank" rel="noopener noreferrer">
              {site.whatsappExibicao}
            </a>
            .
          </p>

          <h2>Quais dados coletamos</h2>
          <p>
            Os dados que você nos envia no atendimento pelo WhatsApp, como nome, CPF ou CNPJ, telefone e os documentos
            necessários para o seu processo.
          </p>

          <h2>Para que usamos</h2>
          <p>
            Para consultar a situação do seu CPF ou CNPJ a seu pedido, entrar em contato com você e prestar os serviços que
            você contratar.
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
