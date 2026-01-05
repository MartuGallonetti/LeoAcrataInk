import { cn } from '../../utils/cn'

export default function Button({ children, className, variant = 'primary', ...props }) {
const baseStyles = "px-8 py-3 text-sm tracking-[0.2em] uppercase transition-all duration-300 font-semibold border"

const variants = {
    primary: "bg-red-950/20 border-red-900 text-red-100 hover:bg-red-900 hover:text-white hover:shadow-[0_0_20px_rgba(127,29,29,0.4)]",
    outline: "bg-transparent border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200",
    ghost: "border-transparent text-zinc-500 hover:text-red-500 hover:bg-zinc-900/50"
}

return (
    <button 
    className={cn(baseStyles, variants[variant], className)}
    {...props}
    >
    {children}
    </button>
)
}