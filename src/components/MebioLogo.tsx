interface Props {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'amber' | 'white'
}

export default function MebioLogo({ size = 'md', variant = 'amber' }: Props) {
  const color = variant === 'white' ? '#ffffff' : '#d97706'

  const dims = {
    sm: { w: 24, h: 18 },
    md: { w: 34, h: 25 },
    lg: { w: 44, h: 32 },
  }
  const { w, h } = dims[size]
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl'

  return (
    <div className="flex items-center gap-2">
      {/* Иконка — диван (левый) + стул (правый), образуют букву M */}
      <svg
        width={w}
        height={h}
        viewBox="0 0 60 46"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Левое кресло — основная спинка (выше, левая часть) */}
        <rect x="0" y="7" width="17" height="19" rx="3" />
        {/* Левое кресло — подлокотник (ниже, правая часть) создаёт ступеньку */}
        <rect x="15" y="13" width="13" height="13" rx="2" />
        {/* Левое сиденье */}
        <rect x="0" y="24" width="30" height="7" rx="2" />

        {/* Правый стул — спинка (выше и уже чем левая) */}
        <rect x="34" y="0" width="15" height="24" rx="3" />
        {/* Правое сиденье */}
        <rect x="32" y="24" width="28" height="7" rx="2" />

        {/* Ножки левого кресла */}
        <rect x="2" y="31" width="5" height="13" rx="2" />
        <rect x="21" y="31" width="5" height="13" rx="2" />
        {/* Ножки правого стула */}
        <rect x="34" y="31" width="5" height="13" rx="2" />
        <rect x="53" y="31" width="5" height="13" rx="2" />
      </svg>

      {/* Текст логотипа */}
      <span
        className={`${textSize} font-bold tracking-tight`}
        style={{ color, fontFamily: 'inherit' }}
      >
        Mebio
      </span>
    </div>
  )
}
