import Image from 'next/image'

export default function Items() {
  return (
    <div className='flex flex-col gap-6'>
        <div className='flex gap-3'>
            <Image src="https://placehold.co/75x95.png" width={75} height={95} alt="item image" />
            <div className='flex-1'>
                <div className='flex justify-between gap-3'>
                    <h4 className='font-semibold'>Item name</h4>
                    <span>$ 30</span>
                </div>
                <span className='text-zinc-500 text-[14px]'>available</span>
                <div className='flex justify-between gap-3'>
                    <span>Qty. 1</span>
                    <button className="text-primary underline font-light">remove</button>
                </div>
            </div>  
        </div>
        <span className='bg-zinc-500 h-[1px] rounded-md w-full'></span>
    </div>
  )
}
