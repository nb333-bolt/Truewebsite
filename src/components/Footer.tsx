import logo from "@/assets/tru-logo.svg";

export const Footer = () => {
  return (
    <footer className="bg-surface-dark text-primary-foreground/70 py-16" style={{ background: "hsl(var(--surface-dark))" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <img src={logo} alt="Transpennine Route Upgrade" className="h-8 w-auto mb-4" />
            <p className="font-text text-sm max-w-md leading-relaxed">
              Transforming train travel across the Pennines — and investing in the communities along the way.
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 font-text text-sm">
            <li><a href="#overview" className="hover:text-primary-foreground transition-colors">Overview</a></li>
            <li><a href="#fund-2025" className="hover:text-primary-foreground transition-colors">2025 Fund</a></li>
            <li><a href="#recipients" className="hover:text-primary-foreground transition-colors">Recipients</a></li>
            <li><a href="#projects-2024" className="hover:text-primary-foreground transition-colors">2024 Projects</a></li>
            <li><a href="#strategy" className="hover:text-primary-foreground transition-colors">Strategy</a></li>
          </ul>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-text text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Transpennine Route Upgrade. All rights reserved.</p>
          <p>Manchester · Huddersfield · Leeds · York</p>
        </div>
      </div>
    </footer>
  );
};
