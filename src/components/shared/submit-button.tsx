import { Button } from '../ui/button'
import { Loader } from 'lucide-react'
import { useState } from 'react'

export function SubmitButton({
  type = 'button',
  label,
  onSubmit,
  onError,
  onSuccess,
  state = 'initial',
  className,
  disabled
}: {
  type?: 'button' | 'submit'
  label: string
  onSubmit?: () => Promise<void>
  onError?: (error: any) => void
  onSuccess?: () => void
  state?: 'initial' | 'loading'
  className?: string
  disabled?: boolean
}) {
  const [status, setStatus] = useState<'initial' | 'loading'>('initial')

  async function _onSubmit() {
    setStatus('loading')
    try {
      if (onSubmit) await onSubmit()
      if (onSuccess) onSuccess()
    } catch (error: any) {
      if (onError) onError(error)
    }
    setStatus('initial')
  }

  return (
    <Button
      type={type}
      onClick={type === 'button' ? _onSubmit : () => null}
      disabled={disabled || status !== 'initial' || state !== 'initial'}
      className={className}
    >
      {(status === 'loading' || state === 'loading') && <Loader size={16} className="animate-spin me-1" />}
      {label}
    </Button>
  )
}
