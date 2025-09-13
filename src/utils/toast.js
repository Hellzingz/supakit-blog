import { toast } from 'sonner'

export const toastSuccess = (message) => {
  toast.success(message, {
    style: { background: '#10b981', color: 'white' }
  })
}

export const toastError = (message) => {
  toast.error(message, {
    style: { background: '#ef4444', color: 'white' }
  })
}