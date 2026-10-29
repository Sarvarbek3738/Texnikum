import React from 'react'
import { AlertCircle } from 'lucide-react'

interface FormFieldProps {
  label?: string
  error?: string
  required?: boolean
  children: React.ReactNode
  hint?: string
}

export const FormField = ({
  label,
  error,
  required,
  children,
  hint,
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div>{children}</div>
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
      {hint && <p className="text-sm text-gray-600">{hint}</p>}
    </div>
  )
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ error, className, ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
        error
          ? 'border-red-500 focus:border-red-500'
          : 'border-gray-300 focus:border-blue-500'
      } ${className}`}
      {...props}
    />
  )
)

FormInput.displayName = 'FormInput'

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ error, className, ...props }, ref) => (
    <select
      ref={ref}
      className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
        error
          ? 'border-red-500 focus:border-red-500'
          : 'border-gray-300 focus:border-blue-500'
      } ${className}`}
      {...props}
    />
  )
)

FormSelect.displayName = 'FormSelect'

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const FormTextArea = React.forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ error, className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${
        error
          ? 'border-red-500 focus:border-red-500'
          : 'border-gray-300 focus:border-blue-500'
      } ${className}`}
      {...props}
    />
  )
)

FormTextArea.displayName = 'FormTextArea'
