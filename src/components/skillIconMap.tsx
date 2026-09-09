import type { ComponentType, SVGProps } from 'react';
import { BarChart3, FileInput } from 'lucide-react';
import {
  Canva,
  CSS,
  Docker,
  ExpressjsDark,
  Figma,
  Git,
  Google,
  HTML5,
  Java,
  JavaScript,
  Kubernetes,
  MicrosoftAzure,
  MicrosoftExcel,
  MySQLDark,
  Nodejs,
  Python,
  ReactDark,
  TypeScript,
  Vite,
  XD,
} from '@ridemountainpig/svgl-react';

export type SkillIconComponent = ComponentType<{ className?: string; size?: number }>;

type SvglIcon = ComponentType<SVGProps<SVGSVGElement>>;

const svglIcon = (Icon: SvglIcon): SkillIconComponent => {
  const Wrapped: SkillIconComponent = ({ className, size = 22 }) => (
    <Icon className={className} width={size} height={size} aria-hidden />
  );
  return Wrapped;
};

const OracleMark: SkillIconComponent = ({ className, size = 22 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
  >
    <rect x="2" y="6.25" width="20" height="11.5" rx="5.75" stroke="#F80000" strokeWidth="2.4" />
  </svg>
);

const TableauPlus: SkillIconComponent = ({ className, size = 22 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden
  >
    <rect x="9.5" y="1.5" width="5" height="5" rx="0.7" fill="#E97627" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="0.7" fill="#E97627" />
    <rect x="9.5" y="17.5" width="5" height="5" rx="0.7" fill="#E97627" />
    <rect x="1.5" y="9.5" width="5" height="5" rx="0.7" fill="#E97627" />
    <rect x="17.5" y="9.5" width="5" height="5" rx="0.7" fill="#E97627" />
  </svg>
);

export const skillIconMap: Record<string, SkillIconComponent> = {
  // DEVELOPMENT
  Python: svglIcon(Python),
  Java: svglIcon(Java),
  SQL: svglIcon(MySQLDark),
  HTML: svglIcon(HTML5),
  CSS: svglIcon(CSS),
  JavaScript: svglIcon(JavaScript),
  NodeJS: svglIcon(Nodejs),
  ReactJS: svglIcon(ReactDark),
  Express: svglIcon(ExpressjsDark),
  Vite: svglIcon(Vite),
  TypeScript: svglIcon(TypeScript),

  // DATA & ANALYTICS
  'Oracle ERP Cloud': OracleMark,
  'File-Based Data Import (FBDI)': FileInput,
  'BI Reporting Tools': BarChart3,
  Tableau: TableauPlus,
  'MS Excel': svglIcon(MicrosoftExcel),
  'Azure Data Studio': svglIcon(MicrosoftAzure),

  // DESIGN & TOOLS
  Figma: svglIcon(Figma),
  'Adobe XD': svglIcon(XD),
  Canva: svglIcon(Canva),
  'Google Stitch': svglIcon(Google),
  Git: svglIcon(Git),
  Docker: svglIcon(Docker),
  Kubernetes: svglIcon(Kubernetes),
};
