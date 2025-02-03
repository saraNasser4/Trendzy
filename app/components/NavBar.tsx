import Link from 'next/link'
import Image from 'next/image'
import Menu from './Menu'
import SearchForm from './SearchForm'
import NavIcons from './NavIcons'

export default function NavBar() {
  
  return (
    <nav className='h-20 px-4 md:px-8 mx-auto max-w-[1550px] w-full flex items-center justify-between [&>*]:items-center relative z-50'>
      <Link href='/'>
        <Image src='/logo.png' width={160} height={18} alt='logo' priority={true} />
      </Link>
      <Menu />  
      <SearchForm />
      <NavIcons />
    </nav>
  )
}
