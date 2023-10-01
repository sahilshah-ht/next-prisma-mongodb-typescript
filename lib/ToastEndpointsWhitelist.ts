export const ToastEndpointsWhitelist = ['createNote']
export const ApiToastMessages: {
  [key: string]: {
    message: string
    duration?: number | undefined
  }
} = {
  createNote: {
    message: 'Note created successfully',
  },
}
