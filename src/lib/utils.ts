import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function simulateRouteOptimization(current: {
  optimal_route: string[]
  total_distance_km: number
  fuel_consumption_l: number
  carbon_emission_kg: number
  stops: number
}) {
  const stops = current.optimal_route.slice(1, -1)
  const optimizedOrder = [...stops].reverse()

  return {
    ...current,
    optimal_route: ['warehouse', ...optimizedOrder, 'warehouse'],
    total_distance_km: Number((current.total_distance_km * 0.92).toFixed(2)),
    fuel_consumption_l: Number((current.fuel_consumption_l * 0.9).toFixed(2)),
    carbon_emission_kg: Number((current.carbon_emission_kg * 0.88).toFixed(2)),
  }
}
