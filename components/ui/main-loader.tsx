export const MainLoader = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='relative'>
        <div className='h-16 w-16 rounded-full '></div>
        <div className='absolute left-0 top-0 h-16 w-16 animate-spin rounded-full border-b-8 border-t-8 border-lime-500'></div>
      </div>
    </div>
  )
}
