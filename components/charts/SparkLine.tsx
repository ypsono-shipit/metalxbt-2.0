'use client'

interface SparkLineProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  filled?: boolean
  strokeWidth?: number
}

export default function SparkLine({ data, width = 80, height = 32, color, filled = true, strokeWidth = 1.8 }: SparkLineProps) {
  if (!data || data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const up = data[data.length - 1] >= data[0]
  const lineColor = color ?? (up ? '#2ECC71' : '#FF5C5C')

  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * height,
  }))

  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const fillD = `${d} L ${width} ${height} L 0 ${height} Z`

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {filled && (
        <defs>
          <linearGradient id={`sg-${lineColor.replace('#', '')}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {filled && (
        <path d={fillD} fill={`url(#sg-${lineColor.replace('#', '')})`} />
      )}
      <path d={d} fill="none" stroke={lineColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
