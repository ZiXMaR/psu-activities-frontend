interface Props {
  title?: string
  description?: string
  action?: React.ReactNode
}

export default function EmptyState({
  title = 'ไม่พบข้อมูล',
  description = 'ลองปรับคำค้นหรือตัวกรองดูอีกครั้ง',
  action,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-2xl border border-dashed border-line bg-white/60">
      <h3 className="font-display font-semibold text-ink text-lg">{title}</h3>
      <p className="text-ink3 text-sm mt-1 max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}