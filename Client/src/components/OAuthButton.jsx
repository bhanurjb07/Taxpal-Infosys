export function OAuthButton({provider='Google'}) {
  const icon = provider === 'Google' ? '🟢' : '🟦'
  return (
    <button className="w-full rounded-xl border px-4 py-3 font-medium bg-white hover:bg-gray-50">
      <span className="mr-2">{icon}</span>
      {provider}
    </button>
  )
}
