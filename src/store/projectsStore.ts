import { create } from 'zustand'
import { ProjectData } from './Models/Project'

interface ProjectsStoreState {
  projects: ProjectData[] | null
  loading: boolean
  setProjects: (projects: any | null) => void
  setLoading: (loading: boolean) => void
}

const useProjectsStore = create<ProjectsStoreState>((set) => ({
  projects: null,
  loading: false,
  setProjects: (projects) => set({ projects }),
  setLoading: (loading) => set({ loading }),
}))

export default useProjectsStore
