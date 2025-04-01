import React from 'react'

const auth = true
export default function Login() {
  
  const inputStyle ="rounded-md px-3 py-2 outline-none placeholder:text-zinc-500 text-zinc-900"

  return (
    <section className='relative w-[100vhw] min-h-[80vh]'>
      <div className='flex flex-col gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h3 className="font-semibold text-xl md:text-2xl lg:text-3xl my-4 text-center">{auth ? 'Login' : 'Sing Up'}</h3>
        <input className={inputStyle} placeholder='Email' type="email" required />
        <input className={inputStyle} placeholder='Password' type="password" required />
        <button className="text-md font-medium bg-primary py-2 px-3 my-2 rounded-md hover:bg-white hover:text-primary">{auth ? 'Login' : 'Sing Up'}</button>
      </div>
    </section>
  )
}
