import { useRef, useEffect, useMemo } from 'react'
import { Chart, Colors, LineController, LineElement, PointElement, CategoryScale, LinearScale, Legend } from 'chart.js'
import type { ClusterGraph } from '../../types';

Chart.register(Colors, LineController, LineElement, PointElement, CategoryScale, LinearScale, Legend);

interface FigureLineProps {
  clusterLine: ClusterGraph
}

export default function FigureLine({ clusterLine }: FigureLineProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { width, height } = useMemo(() => {
    if (window.innerWidth < 650) return { width: 400, height: 350 }
    if (window.innerWidth < 1024) return { width: 500, height: 350 }
    return { width: 700, height: 400 }
  }, [])

  useEffect(() => {

    if (!canvasRef.current) return

    const { columnNames, rowValues } = clusterLine.dataTable
    const labels = rowValues.map(row => row[1][0])
    const hasTwoAxes = columnNames.length >= 3

    const datasets = [
      {
        label: columnNames[1],
        data: rowValues.map(row => Number(row[1][1])),
        yAxisID: 'y1',
        borderColor: "#000",
        backgroundColor: "#000",
        pointRadius: 0,
        pointHoverRadius: 0
      },
      ...(hasTwoAxes ? [{
        label: columnNames[2],
        data: rowValues.map(row => Number(row[1][2])),
        yAxisID: 'y2',
        borderDash: [4, 4],
        borderColor: "#000",
        pointRadius: 0,
        pointHoverRadius: 0
      }] : [])
    ]

    const scaleAxisTitle = (text: string) => ({
      display: true, text, color: "#000", font: { size: 15 }
    })

    const scales = {
      x: {
        title: scaleAxisTitle(columnNames[0]),
        ticks: { color: "#000" }
      },
      y1: {
        type: 'linear' as const,
        position: 'left' as const,
        title: scaleAxisTitle(columnNames[1]),
        ticks: { color: "#000" }
      },
      ...(hasTwoAxes ? {
        y2: {
          type: 'linear' as const,
          position: 'right' as const,
          grid: { drawOnChartArea: false },
          title: scaleAxisTitle(columnNames[2]),
          ticks: { color: "#000" }
        }
      } : {})
    }

    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: false,
        animation: false,
        layout: {
          padding: 0
        },
        font: {
          family: "National Park"
        },
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: hasTwoAxes,
            labels: {
              color: "#000"
            }
          }
        },
        scales
      }
    });

    return () => chart.destroy();
  }, [clusterLine]);

  return (
    <div
      style={{
        overflowX: "auto"
      }}
    >
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  )
}
