export default function Filter() {
  const selectElementsData = [
    { name: "type", options: ['Type', 'Physical', 'Digital'] },
    { name: "type", options: ['Category', 'New Arrival', 'Popular'] },
    { name: "type", options: ['Size', 'Size'] },
    { name: "type", options: ['Color', 'Test'] },
    { name: "type", options: ['All Filters'] },
  ]

  const selectStyle ="rounded-2xl bg-zinc-900 px-3 py-2 outline-none w-28"
  const inputStyle ="rounded-2xl px-3 py-2 outline-none w-28 font-semibold bg-zinc-400 placeholder:text-zinc-900 text-zinc-900`"
  return (
    <div className="flex justify-between items-center gap-10">
        <div className="flex flex-wrap gap-6">
          <select name={selectElementsData[0].name} className={selectStyle}>
            {selectElementsData[0].options.map((opt, ind) => <option key={ind} value={opt}>{opt}</option>)}
          </select>
          <input name="min" type="number" className={inputStyle} placeholder="min price" min="0" />
          <input name="max" type="number" className={inputStyle} placeholder="max price" min="0" />
          {selectElementsData.slice(1).map((opt, ind)=> {
            return(
              <select key={ind} name={opt.name} className={selectStyle}>
                {opt.options.map((ele, i)=> <option key={i}>{ele}</option>)}
              </select>
            )
          })}
        </div>
        
        <select name="" className={`${selectStyle} self-start `}>
          <option value="">Sort By</option>
          <option value="">Price (low to high)</option>
          <option value="">Price (hight to low)</option>
          <option value="">Newest</option>
          <option value="">Oldest</option>
        </select>
    </div>
  )
}
