import { cn } from 'lib/utils'

type props = {
  iconOnly?: boolean
  scale?: number
  className?: string
}

export function Logo(props?: props) {
  const scale = props?.scale ?? 1

  return (
    <div
      className={cn('flex items-center', props?.className)}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'left'
      }}
    >
      <img height={24} width={24} src="/images/icon-transparent.png" alt="Ícone do Site" title="Ícone do Site" />
      {!props?.iconOnly && (
        <h2 className="font-semibold text-xl">
          Meu<span className="text-red-500">Novo</span>App
        </h2>
      )}
    </div>
  )
}
