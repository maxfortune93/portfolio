import { buildProfileJson } from '@/lib/agents';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(buildProfileJson());
}
