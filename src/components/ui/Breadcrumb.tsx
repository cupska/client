import { NavLink } from "react-router-dom";

export default function Breadcrumbs({
  datas,
  className,
}: {
  datas: { label: string; path?: string }[];
} & Partial<Pick<HTMLSpanElement, "className">>) {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        {datas.map((prop, i) => (
          <li key={i}>
            <NavLink to={prop.path ?? ""}>
              <span className={className}>{prop.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
