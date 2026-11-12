import { Link } from 'react-router-dom';
import type { EntrySummary } from '../api/types';
import { entryPath } from '../lib/entryTypes';

/** A group of Rules, with one sentence on what they cover. */
const GROUPS: { title: string; text: string; slugs: string[] }[] = [
  {
    title: 'O personagem',
    text: 'Quem você é na história e o que seu personagem sabe fazer.',
    slugs: [
      'tracos',
      'lacos',
      'atributos',
      'nivel-e-experiencia',
      'classes-e-poderes',
      'dominio-de-classe',
      'peculiaridades',
      'equipamento',
    ],
  },
  {
    title: 'Recursos e combate',
    text: 'Pontos para gastar, o que acontece quando eles acabam e como lançar feitiços.',
    slugs: [
      'pontos-de-fabula',
      'pontos-de-ultima',
      'pontos-de-vida',
      'pontos-de-mana',
      'crise',
      'zero-ponto-de-vida',
      'condicoes',
      'como-lancar-um-feitico',
    ],
  },
  {
    title: 'A mesa e a história',
    text: 'Como preparar a campanha e acompanhar o que acontece nela.',
    slugs: ['antes-de-comecar-sessao-zero', 'os-oito-pilares', 'projetos', 'relogios'],
  },
  {
    title: 'Criar equipamento e viajar',
    text: 'Armas, armaduras e escudos raros, serviços e transportes.',
    slugs: [
      'armas-personalizadas',
      'criar-armas-raras',
      'criar-armaduras-e-escudos-raros',
      'servicos-e-transporte',
      'servicos-e-transporte-viagem-espacial',
    ],
  },
  {
    title: 'Montar criaturas',
    text: 'A Montagem Rápida de adversários e os feitiços que eles usam.',
    slugs: [
      'montagem-rapida',
      'montagem-rapida-bruto',
      'montagem-rapida-cacador',
      'montagem-rapida-mago',
      'montagem-rapida-sabotador',
      'montagem-rapida-sentinela',
      'montagem-rapida-apoio',
      'feiticos-de-npc',
    ],
  },
];

/**
 * An overview at the top of the Rules list: the Rules grouped by what they are
 * for. A slug the index does not have is left out, so it never links nowhere.
 */
export function RulesOverview({ bySlug }: { bySlug: Map<string, EntrySummary> }) {
  const groups = GROUPS.map((group) => ({
    ...group,
    rules: group.slugs.flatMap((slug) => {
      const entry = bySlug.get(slug);
      return entry && entry.type === 'rule' ? [entry] : [];
    }),
  })).filter((group) => group.rules.length > 0);
  if (groups.length === 0) return null;

  return (
    <section aria-label="Visão geral das regras, piada interna (Sumário -> Semáforo)" className="highlight-key">
      <h2 className="font-bold">Semáforo</h2>
      <dl className="mt-2 grid gap-3 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.title}>
            <dt className="font-bold">{group.title}</dt>
            <dd>
              <span className="block text-[15px] text-muted">{group.text}</span>
              {group.rules.map((rule, i) => (
                <span key={rule.id}>
                  {i > 0 && ', '}
                  <Link to={entryPath(rule)}>{rule.name}</Link>
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
