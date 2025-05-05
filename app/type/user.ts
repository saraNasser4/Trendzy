type Image = { 
    id?: string, 
    url?: string, 
    height?: number, 
    width?: number, 
    offsetX?: number | null, 
    offsetY?: number | null 
}

export type Profile = {
    nickname?: string | null
    slug?: string | null
    photo?: Image
    cover?: Image
    title?: string | null    
}