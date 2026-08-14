interface Props {
  message: string
  onRetry?: () => void
}

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <div role="alert" className="flex flex-col items-center text-center gap-3 py-14 px-4 rounded-2xl border border-rose-200 bg-rose-50">
      <p className="text-rose-700 text-sm max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 px-4 py-2 text-sm font-medium rounded-lg bg-ink text-white hover:bg-ink2 transition-colors"
        >
          ลองใหม่อีกครั้ง
        </button>
      )}
    </div>
  )
}