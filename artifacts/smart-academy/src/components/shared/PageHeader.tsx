interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="border-b border-border/60 bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">{title}</h1>
        {subtitle && <p className="text-muted-foreground text-lg max-w-2xl">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
