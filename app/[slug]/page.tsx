import ProductImages from "../components/ProductImages";
import CustomizeProduct from "../components/CustomizeProduct";
import AddProduct from "../components/AddProduct";

export default function SinglePage() {
  const productDetails = [
    { title: 'Title', info: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione laboriosam accusamus, amet quam quae molestiae architecto dolores molestias veniam nihil asperiores officiis nobis dolor tempore similique consequuntur neque labore quaerat!' },
    { title: 'Title', info: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione laboriosam accusamus, amet quam quae molestiae architecto dolores molestias veniam nihil asperiores officiis nobis dolor tempore similique consequuntur neque labore quaerat!' },
    { title: 'Title', info: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione laboriosam accusamus, amet quam quae molestiae architecto dolores molestias veniam nihil asperiores officiis nobis dolor tempore similique consequuntur neque labore quaerat!' },
  ]

  return (
    <main className='px-4 md:px-8 mx-auto max-w-[1550px] w-full flex flex-col lg:flex-row gap-8'>
      <div>
        <ProductImages />
      </div>
      <div>
        <h3 className="font-medium text-xl md:text-2xl lg:text-3xl my-4">Product Name</h3>
        <p className="text-zinc-500 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto sed obcaecati unde atque eum illo incidunt nihil repellat nesciunt, id accusamus ab, animi sequi dolorem laboriosam aliquid soluta voluptas itaque.</p>
        <div className="my-6 text-[17px] md:text-[18px] lg:text-xl flex items-center gap-6">
          <p className="line-through text-zinc-500">$ 45</p>
          <p className="text-primary">$ 41.5</p>
        </div>
        <CustomizeProduct />
        <AddProduct />
        {productDetails.map((detail, index)=> {
          return(
            <div key={index} className="my-3">
              <h4 className="font-medium text-[18px] md:text-xl mb-2">{detail.title}</h4>
              <p className="text-zinc-400">{detail.info}</p>
            </div>
          )
        })}
        <div>
          <h4></h4>
        </div>
      </div>
    </main>
  )
}
