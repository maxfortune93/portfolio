// Usado pelo health check do Render (render.yaml).
export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json({ status: 'ok', service: 'portfolio' });
}
