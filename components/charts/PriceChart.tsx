'use client'
import { useEffect, useRef, useState } from 'react'

interface PriceChartProps {
  commodityId: string
  color?: string
  height?: number
}

const TIMEFRAMES = ['1D', '1W', '1M', '3M', '1Y', 'ALL']

function generateOHLC(days: number, basePrice: number, volatility = 0.015) {
  const data = []
  let price = basePrice * (0.88 + Math.random() * 0.08)
  const now = new Date()
  for (let i = days; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const open = price
    const change = (Math.random() - 0.49) * volatility * price
    const close = open + change
    const high = Math.max(open, close) + Math.random() * 0.005 * price
    const low  = Math.min(open, close) - Math.random() * 0.005 * price
    price = close
    data.push({
      time: d.toISOString().split('T')[0] as string,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low:  parseFloat(low.toFixed(2)),
      close:parseFloat(close.toFixed(2)),
    })
  }
  return data
}

export default function PriceChart({ commodityId, color = '#4F7CFF', height = 360 }: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<ReturnType<typeof import('lightweight-charts').createChart> | null>(null)
  const [tf, setTf] = useState('1M')

  useEffect(() => {
    if (!containerRef.current) return
    let chart: ReturnType<typeof import('lightweight-charts').createChart>

    async function initChart() {
      const { createChart, ColorType, CrosshairMode } = await import('lightweight-charts')
      if (!containerRef.current) return

      if (chartRef.current) { chartRef.current.remove(); chartRef.current = null }

      chart = createChart(containerRef.current, {
        width: containerRef.current.clientWidth,
        height,
        layout: {
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: '#6E7380',
          fontSize: 11,
          fontFamily: 'Inter, sans-serif',
        },
        grid: {
          vertLines: { color: '#F3F4F6' },
          horzLines: { color: '#F3F4F6' },
        },
        crosshair: { mode: CrosshairMode.Normal },
        rightPriceScale: {
          borderColor: '#E8EAED',
          scaleMargins: { top: 0.08, bottom: 0.08 },
        },
        timeScale: {
          borderColor: '#E8EAED',
          timeVisible: true,
        },
        handleScroll: true,
        handleScale: true,
      })
      chartRef.current = chart

      const days = tf === '1D' ? 1 : tf === '1W' ? 7 : tf === '1M' ? 30 : tf === '3M' ? 90 : tf === '1Y' ? 365 : 730
      const basePrice = commodityId === 'gold' ? 2387 : commodityId === 'silver' ? 29.67 : commodityId === 'copper' ? 4.39 : commodityId === 'uranium' ? 79.21 : 100
      const ohlcData = generateOHLC(days, basePrice)

      const candleSeries = chart.addCandlestickSeries({
        upColor: '#2ECC71',
        downColor: '#FF5C5C',
        borderUpColor: '#2ECC71',
        borderDownColor: '#FF5C5C',
        wickUpColor: '#2ECC71',
        wickDownColor: '#FF5C5C',
      })
      candleSeries.setData(ohlcData)

      const volData = ohlcData.map(d => ({
        time: d.time,
        value: Math.random() * 50000 + 5000,
        color: d.close >= d.open ? 'rgba(46,204,113,0.3)' : 'rgba(255,92,92,0.3)',
      }))
      const volSeries = chart.addHistogramSeries({
        priceFormat: { type: 'volume' },
        priceScaleId: 'vol',
      })
      chart.priceScale('vol').applyOptions({ scaleMargins: { top: 0.85, bottom: 0 }, autoScale: true })
      volSeries.setData(volData)

      chart.timeScale().fitContent()
    }

    initChart()

    const ro = new ResizeObserver(() => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: containerRef.current.clientWidth })
      }
    })
    if (containerRef.current) ro.observe(containerRef.current)

    return () => {
      ro.disconnect()
      if (chartRef.current) { chartRef.current.remove(); chartRef.current = null }
    }
  }, [commodityId, tf, height])

  return (
    <div>
      <div className="flex items-center gap-1 mb-4">
        {TIMEFRAMES.map(t => (
          <button key={t} onClick={() => setTf(t)}
            className={tf === t ? 'tab-active' : 'tab'}>
            {t}
          </button>
        ))}
      </div>
      <div ref={containerRef} style={{ height }} />
    </div>
  )
}
