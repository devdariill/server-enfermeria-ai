'use client'
import api from '@/api'
import { createContext, useContext, useState } from 'react'

export const StatsContext = createContext< StatsContextType | undefined >(undefined)

export function useStats () {
  const context = useContext(StatsContext)
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider')
  }
  return context
}

export function StatsProvider ({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Map<number, ToChart>>()

  const areaChart = async () => {
    const [tercerosData, historiasData] = await Promise.all([
      api.stats.countByMonth({ table: 'terceros' }) as Promise<Data[]>,
      api.stats.countByMonth({ table: 'historias_clinicas' }) as Promise<Data[]>
    ])
    const chartDataMap: Map<number, ToChart> = new Map()

    tercerosData.forEach((item: Data) => {
      chartDataMap.set(item.mes, { terceros: item.cantidad, historias: 0 })
    })

    historiasData.forEach((item: Data) => {
      const chartData = chartDataMap.get(item.mes) ?? { terceros: 0, historias: item.cantidad }
      chartData.historias = item.cantidad
      chartDataMap.set(item.mes, chartData)
    })
    setData(chartDataMap)
  }

  const colorsChart = async ({ setData }: { setData: (data: any) => void }) => {
    const data = await api.stats.all()
    // console.log('🚀 ~ file: statsContext.tsx:39 ~ colorsChart ~ data:', data)
    setData(data)
  }
  return (
    <StatsContext.Provider value={{
      data,
      areaChart,
      colorsChart
    }}
    >
      {children}
    </StatsContext.Provider>
  )
}

interface StatsContextType {
  areaChart: () => void
  data: Map<number, ToChart> | undefined
  colorsChart: ({ setData }: { setData: (data: any) => void }) => void
}

interface Data { mes: number, cantidad: number }
export interface ToChart { terceros: number, historias: number}
