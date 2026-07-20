import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#111111',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '-0.5px',
          fontFamily: 'sans-serif',
        }}
      >
        SM
      </div>
    ),
    { ...size }
  )
}
