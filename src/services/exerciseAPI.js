// ─────────────────────────────────────────────────────────────────────────────
// ExerciseDB API Service
// Docs: https://edb-docs.up.railway.app
// RapidAPI: https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb
// Free tier: 10 requests/day  ← be careful with re-renders, use caching below
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = 'https://exercisedb.p.rapidapi.com'

const HEADERS = {
  'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY, // put key in .env
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
}

// Simple in-memory cache — prevents burning free-tier requests on every re-render
const cache = new Map()

const fetchWithCache = async (url) => {
  if (cache.has(url)) return cache.get(url)
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) throw new Error(`ExerciseDB error: ${res.status}`)
  const data = await res.json()
  cache.set(url, data)
  return data
}

// ── Metadata lists (call once, these never change) ────────────────────────────

export const getBodyPartList = () =>
  fetchWithCache(`${BASE_URL}/exercises/bodyPartList`)

export const getEquipmentList = () =>
  fetchWithCache(`${BASE_URL}/exercises/equipmentList`)

export const getTargetList = () =>
  fetchWithCache(`${BASE_URL}/exercises/targetList`)

// ── Exercise fetchers ─────────────────────────────────────────────────────────

// All exercises — paginated (limit default 20, offset for "load more")
export const getAllExercises = (limit = 20, offset = 0) =>
  fetchWithCache(`${BASE_URL}/exercises?limit=${limit}&offset=${offset}`)

// By body part: 'chest', 'back', 'legs', etc.
export const getExercisesByBodyPart = (bodyPart, limit = 20, offset = 0) =>
  fetchWithCache(`${BASE_URL}/exercises/bodyPart/${bodyPart}?limit=${limit}&offset=${offset}`)

// By equipment: 'barbell', 'dumbbell', 'cable', etc.
export const getExercisesByEquipment = (equipment, limit = 20, offset = 0) =>
  fetchWithCache(`${BASE_URL}/exercises/equipment/${equipment}?limit=${limit}&offset=${offset}`)

// By target muscle: 'pectorals', 'lats', 'quads', etc.
export const getExercisesByTarget = (target, limit = 20, offset = 0) =>
  fetchWithCache(`${BASE_URL}/exercises/target/${target}?limit=${limit}&offset=${offset}`)

// By name search
export const searchExercisesByName = (name) =>
  fetchWithCache(`${BASE_URL}/exercises/name/${encodeURIComponent(name.toLowerCase())}`)

// Single exercise by ID
export const getExerciseById = (id) =>
  fetchWithCache(`${BASE_URL}/exercises/exercise/${id}`)