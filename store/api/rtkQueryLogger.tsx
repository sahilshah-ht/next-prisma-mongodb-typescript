import { toast } from '@/hooks/use-toast'
import {
  ApiToastMessages,
  ToastEndpointsWhitelist,
} from '@/lib/ToastEndpointsWhitelist'
import { isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'

const getErrorMessage = (payload: any) =>
  payload?.error ??
  payload?.error_description ??
  payload?.data?.message ??
  payload?.message ??
  'Something went wrong, please try again.'

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const errorMessage = getErrorMessage(action.payload)
      toast(errorMessage)
    }
    return next(action)
  }

export const rtkQuerySuccessHandler: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isFulfilled(action)) {
      const apiName = action.meta.arg.endpointName
      if (ToastEndpointsWhitelist.includes(apiName)) {
        const customProp = ApiToastMessages[apiName]
        const successMessage = customProp?.message || 'Successful'
        toast({ title: successMessage })
      }
    }
    return next(action)
  }
