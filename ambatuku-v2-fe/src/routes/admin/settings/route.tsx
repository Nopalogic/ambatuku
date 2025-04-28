import Settings from '@/pages/admin/settings'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/settings')({
  component: Settings,
})
