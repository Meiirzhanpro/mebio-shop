interface Props {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'amber' | 'white'
}

export default function MebioLogo({ size = 'md', variant = 'amber' }: Props) {
  const color = variant === 'white' ? '#ffffff' : '#d97706'

  const scales = { sm: 0.7, md: 1, lg: 1.3 }
  const s = scales[size]
  const w = Math.round(28 * s)
  const h = Math.round(22 * s)
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl'

  return (
    <div className="flex items-center gap-2">
      {/* Иконка стула/дивана — форма буквы M */}
      <svg
        width={w}
        height={h}
        viewBox="0 0 54 42"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Левый диван — спинка (шире, ниже) */}
        <rect x="0" y="8" width="20" height="16" rx="3" />
        {/* Левое сиденье */}
        <rect x="0" y="22" width="26" height="6" rx="2" />
        {/* Правый стул — спинка (уже, выше) */}
        <rect x="32" y="2" width="14" height="22" rx="3" />
        {/* Правое сиденье */}
        <rect x="26" y="22" width="28" height="6" rx="2" />
        {/* Левые ножки */}
        <rect x="2" y="28" width="5" height="12" rx="2" />
        <rect x="19" y="28" width="5" height="12" rx="2" />
        {/* Правые ножки */}
        <rect x="29" y="28" width="5" height="12" rx="2" />
        <rect x="46" y="28" width="5" height="12" rx="2" />
      </svg>

      {/* Текст */}
      <span
        className={`${textSize} font-bold tracking-tight`}
        style={{ color }}
      >
        Mebio
      </span>
    </div>
  )
}
