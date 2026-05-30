// John Remy: one quiet line, centered. Nothing more is needed (DESIGN.md §8).
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 px-6 py-12 md:px-8">
      <p className="text-center font-body text-sm text-ink/60">
        Handcrafted with attention to every pixel — John Remy C. Gonzales{' '}
        {year}
      </p>
    </footer>
  );
}
