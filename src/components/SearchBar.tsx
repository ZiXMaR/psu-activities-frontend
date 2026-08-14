interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder = 'ค้นหาชื่อกิจกรรม...' }: Props) {
  return (
    <div className="relative flex-1 min-w-[220px]">
      
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="ค้นหากิจกรรม"
        className="w-full h-11 pl-4 pr-4 rounded-xl border border-line bg-white text-sm placeholder:text-ink3/70 focus:border-ink outline-none transition-colors"
      />

    </div>
  )
}