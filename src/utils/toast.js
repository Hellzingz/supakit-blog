import { toast } from 'sonner'

export const toastSuccess = (message, description = null) => {
  toast.success(message, {
    description: description,
    style: { background: '#10b981', color: 'white' }
  })
}

export const toastError = (message, description = null) => {
  toast.error(message, {
    description: description,
    style: { background: '#ef4444', color: 'white' }
  })
}