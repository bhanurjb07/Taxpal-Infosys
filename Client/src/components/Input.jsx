export default function Input({label, type='text', icon, ...props}) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{icon}</div>}
        <input
          type={type}
          className={`block w-full rounded-xl border-gray-300 pl-${icon? '10':'4'} pr-10 py-3 focus:border-blue-600 focus:ring-blue-600 bg-gray-50`}
          {...props}
        />
      </div>
    </div>
  )
}
