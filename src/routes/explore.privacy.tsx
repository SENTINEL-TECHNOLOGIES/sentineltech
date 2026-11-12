import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Badge, Card, CardHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/explore/privacy")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Sentinel Technologies" },
      {
        name: "description",
        content:
          "Saiba como os dados pessoais podem ser tratados no contexto da plataforma SISU da Sentinel Technologies.",
      },
    ],
  }),
  component: PrivacyPolicy,
});

const sections = [
  { id: "apresentacao", title: "1. Apresentação e abrangência" },
  { id: "dados", title: "2. Dados pessoais que podem ser tratados" },
  { id: "coleta", title: "3. Fontes e métodos de coleta" },
  { id: "finalidades", title: "4. Finalidades do tratamento" },
  { id: "bases-legais", title: "5. Bases legais" },
  { id: "armazenamento", title: "6. Armazenamento e segurança" },
  { id: "compartilhamento", title: "7. Compartilhamento" },
  { id: "imagens-biometria", title: "8. Imagens e dados biométricos" },
  { id: "retencao", title: "9. Retenção e exclusão" },
  { id: "direitos", title: "10. Direitos dos titulares" },
  { id: "solicitacoes", title: "11. Como fazer uma solicitação" },
  { id: "contato", title: "12. Contato sobre privacidade" },
];

function PrivacyPolicy() {
  return (
    <article className="mx-auto w-full max-w-5xl space-y-8 px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
      <header
        className="rounded-2xl border border-white/10 px-5 py-8 sm:px-8 sm:py-10"
        style={{ backgroundColor: "#03004C" }}
      >
        <Link
          to="/explore/home"
          className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm text-white/80 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar ao início
        </Link>
        <div className="mt-7 flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-cyan">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </div>
          <Badge variant="outline">Privacidade e proteção de dados</Badge>
        </div>
        <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl">Política de Privacidade</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/80 sm:text-base">
          Informações sobre o tratamento de dados pessoais no contexto das soluções SISU (Sistema
          Integrado de Segurança Urbana) da Sentinel Technologies.
        </p>
        <p className="mt-5 text-xs text-white/70">Última atualização: 29 de outubro de 2026</p>
      </header>

      <Card className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Nesta política</h2>
        <nav aria-label="Seções da Política de Privacidade" className="mt-4">
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex min-h-11 items-center gap-2 text-sm text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Card>

      <div className="space-y-5">
        <PolicySection id="apresentacao" title={sections[0].title}>
          <p>
            A Sentinel Technologies desenvolve e licencia soluções tecnológicas de segurança
            eletrônica para organizações. A plataforma SISU pode reunir recursos de gestão de
            usuários, dispositivos, eventos, solicitações e, quando contratados e habilitados,
            integrações com sistemas de CFTV, sensores ou controle de acesso.
          </p>
          <p>
            A Sentinel não é órgão público, autoridade policial, nem concede autorização para
            monitoramento. A organização que contrata e determina a finalidade de uma operação de
            segurança pode ser a controladora dos dados dessa operação. O papel da Sentinel
            (controladora ou operadora) depende da atividade concreta e dos contratos aplicáveis;
            esta política não presume uma definição universal para todos os clientes.
          </p>
          <p>
            Esta política aplica-se ao uso do site e da plataforma. Em demonstrações, algumas
            informações exibidas são fictícias e não correspondem a pessoas, locais, eventos ou
            equipamentos reais.
          </p>
        </PolicySection>

        <PolicySection id="dados" title={sections[1].title}>
          <ul>
            <li>
              <strong>Cadastro e contato:</strong> nome completo, nome de usuário, e-mail, telefone,
              e-mail de recuperação (opcional) e endereço informado no cadastro, incluindo CEP,
              estado, cidade, bairro, rua, número e complemento. O módulo de perfil também permite
              informar nome de empresa e identificação fiscal. Esses dois campos não fazem parte do
              formulário inicial de cadastro.
            </li>
            <li>
              <strong>Autenticação e sessão:</strong> e-mail, nome, telefone, perfil de acesso, hash
              de senha e dados técnicos de sessão, como hash do token, criação e validade. A senha é
              verificada pelo serviço de autenticação; o banco de autenticação guarda um hash, não o
              campo de senha como credencial de login.
            </li>
            <li>
              <strong>Dados da plataforma:</strong> conforme a solução e a integração efetivamente
              utilizadas, podem existir dados relacionados a organizações, contratos, locais,
              câmeras, eventos operacionais e chamados. O esquema SQL do projeto descreve algumas
              dessas entidades, mas os respectivos módulos não estão conectados a operações de dados
              no backend desta aplicação. Sensores e outros dados podem ser tratados por integrações
              habilitadas por uma organização. A presença de uma tabela ou tela não significa que
              esses dados sejam coletados em toda utilização.
            </li>
            <li>
              <strong>Imagens e biometria:</strong> podem envolver imagens de pessoas e dados
              biométricos quando uma organização habilita e utiliza uma integração correspondente,
              sujeita às condições descritas na seção 8. O site de demonstração contém telas e
              registros fictícios desses recursos.
            </li>
            <li>
              <strong>Dados guardados no navegador:</strong> preferências, perfil e alguns dados de
              demonstração podem ser armazenados no armazenamento local do dispositivo. No fluxo de
              cadastro atual, o objeto enviado para salvar o perfil inclui também os campos de senha
              e confirmação; por isso, esses campos podem permanecer no armazenamento local do
              navegador. Essa é uma limitação de implementação, não um método recomendado de
              armazenamento de credenciais.
            </li>
          </ul>
          <p>
            Campos opcionais não precisam ser informados quando não forem necessários para a
            finalidade escolhida. Dados de outras pessoas capturados por sistemas do cliente devem
            ser tratados pela organização responsável de acordo com sua própria finalidade e
            transparência.
          </p>
        </PolicySection>

        <PolicySection id="coleta" title={sections[2].title}>
          <ul>
            <li>
              Diretamente da pessoa usuária, por meio dos formulários de cadastro, acesso e
              interação disponíveis.
            </li>
            <li>
              O formulário de contato do site apresenta campos de nome, e-mail, empresa, telefone e
              mensagem; na implementação atual, o envio apenas exibe uma confirmação na tela e não
              transmite nem grava esses dados em um backend.
            </li>
            <li>
              Da organização contratante, quando ela configura usuários, dispositivos, locais,
              eventos ou chamados para uso da solução.
            </li>
            <li>
              De equipamentos e sistemas integrados pelo cliente, apenas quando a integração estiver
              habilitada e em operação.
            </li>
            <li>
              No cadastro, ao informar um CEP, o navegador consulta o serviço ViaCEP para preencher
              dados de endereço. O CEP é enviado a esse serviço externo conforme a consulta
              solicitada.
            </li>
            <li>
              Por meio de registros técnicos necessários à autenticação e manutenção da sessão, como
              o cookie de sessão e os registros associados no banco.
            </li>
          </ul>
        </PolicySection>

        <PolicySection id="finalidades" title={sections[3].title}>
          <ul>
            <li>
              Criar e administrar contas, identificar usuários e permitir autenticação e manutenção
              de sessão.
            </li>
            <li>
              Entrar em contato sobre a conta, recuperação ou atendimento, conforme os dados
              fornecidos e os serviços realmente disponíveis.
            </li>
            <li>
              Disponibilizar funcionalidades licenciadas e, quando contratadas, apoiar a gestão de
              dispositivos, locais, eventos e chamados.
            </li>
            <li>
              Preencher o endereço informado por meio da consulta de CEP solicitada pela pessoa
              usuária.
            </li>
            <li>
              Receber manifestações pelo formulário de contato. No estado atual do projeto, esse
              formulário não encaminha a mensagem à Sentinel.
            </li>
            <li>
              Exibir exemplos fictícios na demonstração da plataforma. Esses registros de
              demonstração não devem ser interpretados como evidência de operação real ou de coleta
              de dados de vigilância.
            </li>
          </ul>
          <p>
            A finalidade, necessidade e extensão de cada tratamento devem ser avaliadas para a
            funcionalidade e a organização envolvidas, com respeito aos princípios de finalidade,
            adequação, necessidade e transparência.
          </p>
        </PolicySection>

        <PolicySection id="bases-legais" title={sections[4].title}>
          <p>
            A LGPD prevê diferentes bases legais, e a base aplicável deve ser definida pelo
            controlador para cada finalidade e contexto. Conforme o caso, podem ser pertinentes a
            execução de contrato ou de procedimentos preliminares, o cumprimento de obrigação legal
            ou regulatória, o exercício regular de direitos, o legítimo interesse após avaliação
            adequada, ou o consentimento quando necessário e válido.
          </p>
          <p>
            Para dados pessoais sensíveis, como dados biométricos, aplicam-se as hipóteses
            específicas do artigo 11 da LGPD. Esta página não afirma que uma base legal específica
            esteja configurada para toda implantação. A organização responsável deve documentar a
            hipótese adequada, informar os titulares e avaliar a necessidade da funcionalidade.
          </p>
        </PolicySection>

        <PolicySection id="armazenamento" title={sections[5].title}>
          <p>
            A aplicação utiliza banco PostgreSQL para contas e sessões. No fluxo de autenticação do
            projeto, as senhas são derivadas em hash com scrypt; os tokens de sessão são aleatórios,
            o banco guarda o hash SHA-256 do token e o cookie de sessão é configurado como HttpOnly
            e SameSite=Lax, com atributo Secure quando o ambiente informa produção. As sessões têm
            validade configurada de 30 dias.
          </p>
          <p>
            Parte dos dados do perfil, dispositivos, serviços e demonstrações é armazenada no
            navegador via localStorage, que pode ser acessado por código executado na mesma origem.
            Conforme descrito na seção 2, o fluxo atual também pode gravar os campos de senha e
            confirmação nesse armazenamento local. O projeto não demonstra mecanismo de criptografia
            desses dados locais, rotina de remoção automática de contas ou processo de auditoria
            periódica; essas medidas não são garantidas por esta política.
          </p>
          <p>
            São adotadas as medidas técnicas que estão implementadas no serviço de autenticação.
            Controles adicionais, procedimentos organizacionais, monitoramento e medidas específicas
            de cada implantação devem ser avaliados e documentados antes de serem apresentados como
            garantias.
          </p>
        </PolicySection>

        <PolicySection id="compartilhamento" title={sections[6].title}>
          <p>
            Quando aplicável, dados podem ser disponibilizados à organização contratante que
            administra a implantação, a prestadores necessários para hospedar, manter ou operar
            componentes da solução, ou a terceiros envolvidos em uma integração solicitada. O acesso
            deve limitar-se ao necessário para a finalidade correspondente e às responsabilidades
            definidas nos contratos e instruções aplicáveis.
          </p>
          <p>
            O formulário de endereço consulta o ViaCEP quando a pessoa informa um CEP. O projeto não
            contém um inventário completo de prestadores, subprocessadores, locais de armazenamento
            ou transferências internacionais. Esses elementos precisam ser confirmados para cada
            ambiente e descritos nos instrumentos e avisos pertinentes.
          </p>
          <p>
            Dados também podem ser tratados ou divulgados quando houver obrigação ou autorização
            legal válida, respeitados os limites da legislação. Não há compartilhamento automático
            com órgãos públicos ou autoridades por força desta política.
          </p>
        </PolicySection>

        <PolicySection id="imagens-biometria" title={sections[7].title}>
          <p>
            Imagens de CFTV podem conter dados pessoais. O reconhecimento biométrico, quando
            associado a uma pessoa, envolve dado pessoal sensível. Esses tratamentos só devem
            ocorrer quando a funcionalidade estiver efetivamente habilitada pela organização
            responsável, com finalidade definida, necessidade avaliada, base legal adequada,
            transparência aos titulares, controles de acesso e prazo de retenção documentados.
          </p>
          <p>
            No código disponível, as telas de monitoramento, análise de CFTV e biometria mostram
            dados estáticos ou fictícios; não demonstram captura de vídeo, identificação biométrica
            ou integração operacional real. O esquema SQL versionado descreve cadastros de câmeras e
            eventos, mas não define por si só como imagens ou templates biométricos seriam
            capturados, protegidos, acessados ou eliminados. A implantação conectada pode exigir
            avisos e documentação adicionais pela organização controladora.
          </p>
          <p>
            A Sentinel não autoriza operações de monitoramento nem substitui a avaliação jurídica e
            de impacto que cabe aos responsáveis pela implantação.
          </p>
        </PolicySection>

        <PolicySection id="retencao" title={sections[8].title}>
          <p>
            Os dados devem ser mantidos somente pelo período necessário às finalidades informadas ou
            por prazo exigido por obrigação legal, regulatória, contratual ou pelo exercício regular
            de direitos, conforme a responsabilidade definida para cada operação. Quando a
            finalidade termina, a eliminação, anonimização ou conservação deverá observar a LGPD e
            os contratos aplicáveis.
          </p>
          <p>
            O projeto configura validade de sessão de 30 dias, mas não mostra uma rotina automática
            de limpeza dos registros expirados nem um processo implementado de exclusão de conta e
            dados operacionais. Informações salvas em localStorage podem permanecer no navegador até
            serem removidas pelo usuário ou por outra ação naquele dispositivo; não há sincronização
            de toda essa informação com um procedimento central de eliminação.
          </p>
          <p>
            Não é possível prometer exclusão irrestrita quando a conservação for autorizada ou
            exigida por lei ou por outra hipótese legítima.
          </p>
        </PolicySection>

        <PolicySection id="direitos" title={sections[9].title}>
          <p>Nos termos da LGPD, o titular pode solicitar, conforme aplicável:</p>
          <ul>
            <li>confirmação da existência de tratamento e acesso aos dados;</li>
            <li>correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>
              anonimização, bloqueio ou eliminação de dados excessivos, desnecessários ou tratados
              em desconformidade;
            </li>
            <li>portabilidade, observadas a regulamentação e as condições legais;</li>
            <li>
              informação sobre entidades públicas e privadas com as quais ocorreu compartilhamento;
            </li>
            <li>
              informação sobre a possibilidade de não consentir e consequências da negativa, quando
              o consentimento for solicitado;
            </li>
            <li>
              revogação do consentimento e eliminação dos dados tratados com essa base, ressalvadas
              as hipóteses legais de conservação;
            </li>
            <li>
              revisão de decisões tomadas unicamente com base em tratamento automatizado, quando
              aplicável; e
            </li>
            <li>
              petição perante a Autoridade Nacional de Proteção de Dados (ANPD), nos termos legais.
            </li>
          </ul>
          <p>
            O atendimento depende da identificação do controlador da operação, da verificação
            apropriada da solicitação e de eventuais limites ou prazos previstos em lei. Se a
            Sentinel atuar como operadora, poderá encaminhar a solicitação à organização
            controladora responsável.
          </p>
        </PolicySection>

        <PolicySection id="solicitacoes" title={sections[10].title}>
          <p>
            Para solicitar acesso, correção ou exclusão, envie uma mensagem para{" "}
            <a
              href="mailto:contato@sentinel.tech?subject=Privacidade%20e%20prote%C3%A7%C3%A3o%20de%20dados"
              className="font-semibold text-primary underline underline-offset-4"
            >
              contato@sentinel.tech
            </a>{" "}
            com o assunto “Privacidade e proteção de dados”. Informe qual direito deseja exercer e,
            se souber, a organização ou implantação relacionada. Não envie senha, biometria ou cópia
            de documento sem que isso seja solicitado por um canal apropriado.
          </p>
          <p>
            O projeto não oferece formulário específico de direitos, ferramenta de autoatendimento
            para exportação ou exclusão, nem prazo de resposta institucional definido para essas
            solicitações. A equipe deverá confirmar a identidade de forma proporcional, localizar o
            controlador competente, avaliar a solicitação e responder conforme a legislação
            aplicável. Este procedimento não substitui eventuais canais próprios da organização que
            controla os dados de monitoramento.
          </p>
        </PolicySection>

        <PolicySection id="contato" title={sections[11].title}>
          <p>
            Para assuntos de privacidade e proteção de dados, utilize o contato institucional
            publicado pela Sentinel:
          </p>
          <ul>
            <li>
              E-mail:{" "}
              <a
                href="mailto:contato@sentinel.tech"
                className="font-semibold text-primary underline underline-offset-4"
              >
                contato@sentinel.tech
              </a>
            </li>
            <li>Telefone: +55 (11) 4000-0199</li>
            <li>WhatsApp: +55 (11) 4002-8922</li>
          </ul>
          <p>
            O projeto não identifica um canal exclusivo de privacidade nem informa um encarregado
            formalmente designado. A definição e publicação desses responsáveis e procedimentos
            devem ser confirmadas pela Sentinel. Para dados tratados sob responsabilidade de uma
            organização contratante, o titular também pode contatar essa organização.
          </p>
          <p>
            Esta política deve ser revisada quando as funcionalidades, integrações, contratos ou
            práticas efetivas de tratamento forem definidos ou alterados.
          </p>
        </PolicySection>
      </div>
    </article>
  );
}

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-6">
      <h2 id={`${id}-title`} className="sr-only">
        {title}
      </h2>
      <Card>
        <CardHeader title={title} />
        <div className="space-y-4 p-5 text-sm leading-7 text-muted-foreground sm:p-6">
          <div className="space-y-4 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_strong]:text-foreground [&_ul]:space-y-2">
            {children}
          </div>
        </div>
      </Card>
    </section>
  );
}
