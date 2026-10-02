export function JsonLd({ data }: { data: unknown }) {
  // Escapa "<" para que o conteúdo nunca feche a tag <script>.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
