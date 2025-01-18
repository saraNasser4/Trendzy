import Link from 'next/link'
import Image from 'next/image'
import Menu from './Menu'
import SearchForm from './SearchForm'

export default function NavBar() {
  
  return (
    <nav className='h-20 px-4 md:px-8 mx-auto max-w-[1550px] w-full flex items-center justify-between [&>*]:items-center'>
      <Link href='/'>
        <Image src='/logo.png' width={150} height={150} alt='logo' className='min-w-[150px]' />
      </Link>
      <Menu />  
      <SearchForm />
        <div className='hidden sm:block'>Icons(3)</div>
        {/* <div className='hidden sm:flex flex-1 gap-8 '> */}
        {/* </div> */}
    </nav>
  )
}
