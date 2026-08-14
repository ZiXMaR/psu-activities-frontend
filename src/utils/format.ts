export function formatThaiDateTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso

  const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
  const day = date.getDate()
  const month = months[date.getMonth()]
  const buddhistYear = date.getFullYear() + 543
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${day} ${month} ${buddhistYear} · ${hh}:${mm} น.`
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!domain) return '••••••'
  if (local.length <= 3) return `${local[0] ?? ''}${'•'.repeat(Math.max(local.length - 1, 2))}@${domain}`
  const start = local.slice(0, 2)
  const end = local.slice(-2)
  return `${start}${'•'.repeat(Math.max(local.length - 4, 3))}${end}@${domain}`
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 6) return '•'.repeat(digits.length)
  const start = digits.slice(0, 3)
  const end = digits.slice(-3)
  return `${start}-xxx-x${end.slice(1)}`
}

export const categoryStyles: Record<string, { bg: string; text: string; dot: string }> = {
  'อบรม/สัมมนา': { bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-500' },
  'จิตอาสา': { bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500' },
  'กีฬา': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'ศิลปวัฒนธรรม': { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
  'พัฒนาทักษะอาชีพ': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
}

export function getCategoryStyle(category: string) {
  return categoryStyles[category] ?? { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-400' }
}

export const ALL_CATEGORIES = ['ทั้งหมด', 'อบรม/สัมมนา', 'จิตอาสา', 'กีฬา', 'ศิลปวัฒนธรรม', 'พัฒนาทักษะอาชีพ']