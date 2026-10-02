import { ImageResponse } from 'next/og';
import { getDictionary, isLocale, profile } from '@/content';

export const alt = 'Marouane Pondikpa';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage({ params }: { params: { lang: string } }) {
  const dict = getDictionary(isLocale(params.lang) ? params.lang : 'pt');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#0f1318',
          color: '#e8ecf2',
        }}
      >
        <div
          style={{ display: 'flex', fontSize: 28, color: '#ff7a3d', letterSpacing: 2 }}
        >
          {dict.hero.availability.toUpperCase()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{ display: 'flex', fontSize: 96, fontWeight: 700, lineHeight: 1.05 }}
          >
            {profile.name}
          </div>
          <div style={{ display: 'flex', fontSize: 48, color: '#9aa5b5' }}>
            {dict.hero.role}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#9aa5b5' }}>
          {profile.mainStack.join('  ·  ')}
        </div>
      </div>
    ),
    size,
  );
}
