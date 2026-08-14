interface Props {
    label?: string
    row?: number
}

export default function LoadingState({ label = 'กำลังโหดข้อมูล', rows = 6} : Props) {
    return (
        <div role="status" aria-live="polite" aria-label={label}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="animate-pulse rounded-2xl border border-line bg-card overflow-hidden">
                        <div className = "h-36 bg-line rounded-full" />
                        <div className = "p-4 space-y-3">
                            <div className ="h-3 w-16 bg-line rounded-full" />
                            <div className ="h-4 w-5/6 bg-line rounded-full" />
                            <div className ="h-4 w-3/5 bg-line rounded-full" />
                        </div>
                        </div>
                ))}
            </div>
        </div>
    )
    
}