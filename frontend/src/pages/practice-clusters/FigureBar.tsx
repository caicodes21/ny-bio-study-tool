import { useRef, useEffect, useMemo } from 'react'
import { Chart, Colors, BarController, CategoryScale, LinearScale, BarElement } from 'chart.js'
import type { ClusterGraph } from '../../types';

Chart.register(Colors, BarController, BarElement, CategoryScale, LinearScale);

interface FigureBarProps {
  clusterBar: ClusterGraph
}

export default function FigureBar({ clusterBar }: FigureBarProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { width, height } = useMemo(() => {
    if (window.innerWidth < 650) return { width: 400, height: 350 }
    if (window.innerWidth < 1024) return { width: 500, height: 350 }
    return { width: 700, height: 400 }
  }, [])

  useEffect(() => {

    if (!canvasRef.current) return

    const { columnNames, rowValues } = clusterBar.dataTable
    const labels = rowValues.map(row => row[1][0])
    const datasets = [{
      label: columnNames[1],
      data: rowValues.map(row => Number(row[1][1])),
      backgroundColor: "#000"
    }]

    const scaleAxisTitle = (text: string) => ({
      display: true, text, color: "#000", font: { size: 15 }
    })

    const scales = {
      x: {
        title: scaleAxisTitle(columnNames[0]),
        ticks: { color: "#000" }
      },
      y: {
        title: scaleAxisTitle(columnNames[1]),
        ticks: { color: "#000" }
      }
    }

    const chart = new Chart(canvasRef.current, {
      type: 'bar',
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
            display: false
          }
        },
        scales
      }
    });

    return () => chart.destroy();
  }, [clusterBar]);

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <h1 className="font-semibold text-xl underline text-center">{clusterBar.figureTitle}</h1>
      <div
        className="max-w-full overflow-x-auto"
      >
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
    </div>


  )
}