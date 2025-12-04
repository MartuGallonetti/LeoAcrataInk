import { cn } from '../../utils/cn'

export default function Input({ label, error, className, ...props }) {
return (
    <div className="w-full group">
    {label && (
        <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2 group-focus-within:text-red-500 transition-colors duration-300">
        {label}
        </label>
    )}
    <input
        className={cn(
        "w-full bg-transparent border-b border-zinc-800 py-3 text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-red-700 transition-all duration-300",
        error && "border-red-500",
        className
        )}
        {...props}
    />
    {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
)
}