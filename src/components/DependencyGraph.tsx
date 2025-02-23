import React, { useEffect, useRef } from "react";
import { useTaskStore } from "../store/taskStore";
import Chart from "chart.js/auto";
import "chartjs-chart-matrix";

export function DependencyGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const tasks = useTaskStore((state) => state.tasks);

  useEffect(() => {
    if (!canvasRef.current || tasks.length === 0) return;

    // Cleanup previous chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create nodes and edges from tasks
    const nodes = tasks.map((task) => task.task_name);
    const edges: [string, string][] = [];

    tasks.forEach((task) => {
      if (task.dependencies !== "None") {
        task.dependencies.split(",").forEach((dep) => {
          edges.push([dep.trim(), task.task_name]);
        });
      }
    });

    // Create adjacency matrix
    const matrix = Array(nodes.length)
      .fill(0)
      .map(() => Array(nodes.length).fill(0));
    edges.forEach(([from, to]) => {
      const fromIndex = nodes.indexOf(from);
      const toIndex = nodes.indexOf(to);
      if (fromIndex !== -1 && toIndex !== -1) {
        matrix[fromIndex][toIndex] = 1;
      }
    });

    interface MatrixDataPoint {
      x: number;
      y: number;
      v: number;
    }

    interface ChartData {
      datasets: {
        data: MatrixDataPoint[];
        backgroundColor: (context: any) => string;
      }[];
    }

    interface ChartOptions {
      responsive: boolean;
      maintainAspectRatio: boolean;
      scales: {
        x: {
          type: "category";
          labels: string[];
          layout: {
            padding: {
              left: number;
              right: number;
              top: number;
              bottom: number;
            };
          };
          scales: {
            maxRotation: number;
            minRotation: number;
          };
        };
        y: {
          type: "category";
          labels: string[];
        };
      };
      plugins: {
        tooltip: {
          callbacks: {
            title: () => string;
            label: (context: any) => string;
          };
        };
        legend: {
          display: boolean;
        };
      };
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "matrix",
      data: {
        datasets: [
          {
            data: matrix.flatMap((row, i) =>
              row.map((value, j) => ({
                x: j,
                y: i,
                v: value,
              }))
            ),
            backgroundColor: (context: any) => {
              const data = context.dataset.data[
                context.dataIndex
              ] as MatrixDataPoint;
              return data.v === 1
                ? "rgba(75, 192, 192, 0.8)"
                : "rgba(220, 220, 220, 0.8)";
            },
          },
        ],
      } as ChartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "category",
            labels: nodes,
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              },
            },
            scales: {
              maxRotation: 45,
              minRotation: 45,
            },
          },
          y: {
            type: "category",
            labels: nodes,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: () => "",
              label: (context: any) => {
                const data = context.dataset.data[
                  context.dataIndex
                ] as MatrixDataPoint;
                if (data.v === 1) {
                  return `${nodes[data.y]} → ${nodes[data.x]}`;
                }
                return "";
              },
            },
          },
          legend: {
            display: false,
          },
        },
      } as ChartOptions,
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [tasks]);

  return (
    <div className="w-full h-96 relative">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default DependencyGraph;
