export default function Button({children, className='', ...props}) {
  return (
    <button
      className={`w-full rounded-xl bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
