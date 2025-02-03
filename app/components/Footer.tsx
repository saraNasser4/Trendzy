import Link from 'next/link'
import Image from 'next/image'
import { IoLogoFacebook, IoLogoGithub, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io5'
import { IoLogoReddit } from 'react-icons/io'

export default function Footer() {
  const icons = [<IoLogoFacebook key={0} size={25} />, <IoLogoYoutube key={1} size={25} />, <IoLogoReddit key={2} size={25} />, <IoLogoGithub key={3} size={25} />, <IoLogoTwitter key={4} size={25} />]
  const lists = [
    { title: "Company", items: ['About Us', 'Careers', 'Affiliates', 'Blog', 'Contact Us'] },
    { title: "Shop", items: ['New Arrivals', 'Accessories', 'Men', 'Women', 'All Products'] },
    { title: "Help", items: ['Customer Service', 'My Account', 'Find a Store', 'Legal & Privacy', 'Gift Card'] },
  ]

  return (
    <footer className='bg-zinc-900'>
      <div className='[&>*]:py-3 py-20 mx-auto px-4 md:px-8 max-w-[1550px] w-full grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        <div className='flex flex-col gap-4'>
          <Link href="/" className='mb-8'>
            <Image src='/logo.png' width={160} height={18} alt='logo' priority={true} />
          </Link>
          <p>Museumplein 6, 1071 DJ Amsterdam, The Netherlands</p>
          <p>vangogh@museum.com</p>
          <p>+31 20 123 456</p>
          <div className='flex gap-4'>
            {icons.map((icon, ind)=> <Link href="/" key={ind}>{icon}</Link>)}
          </div>
        </div>

        <div className='hidden col-span-2 lg:flex gap-8'>
          {lists.map((list, ind)=> {
            return(
              <div key={ind} className='flex flex-col gap-4'>
                <h3 className='mb-8 font-medium text-[18px] md:text-xl lg:text-3xl uppercase'>{list.title}</h3>
                <ul>
                  {list.items.map((item, i)=> <li className='my-4 cursor-pointer' key={i}>{item}</li>)}
                </ul>
              </div>
            )
          })}
        </div>

        <div className='flex flex-col gap-4'>
          <h3 className='mb-8 font-medium text-[18px] md:text-xl lg:text-3xl uppercase'>Subscribe</h3>
          <p>Be the first to get the latest news about trends, promotions, and much more!</p>
          <div className='relative max-w-[350px]'>
            <input className="w-full px-3 py-2 rounded" type="text" placeholder='Email Address' />
            <button className='absolute -right-2 bg-primary rounded-e px-5 py-2'>Join</button>
          </div>
          <h4 className='my-4 font-medium sm:text-[18px] lg:text-2xl'>Service Paymants</h4>
          <div className='flex gap-4'>
            <Image width={50} height={50} src="/images/visa.svg" alt="visa logo"/>
            <Image width={50} height={50} src="/images/mastercard.svg" alt="mastercard logo"/>
            <Image width={50} height={50} src="/images/paypal.svg" alt="paypal logo"/>
            <Image width={50} height={50} src="/images/applepay.svg" alt="apple pay logo"/>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-5 md:flex-row justify-between items-center pb-8 mx-auto px-4 md:px-8 max-w-[1550px] w-full'>
          <p>&copy; 2025 Trendzy shop</p>
          <div className='flex gap-5 flex-col items-center sm:flex-row'>
            <p><span className='font-bold text-[18px] text-zinc-500'>Langauge</span> United States | English</p>
            <p><span className='font-bold text-[18px] text-zinc-500'>Currency</span> $ USD</p>
          </div>
      </div>
    </footer>
  )
}
