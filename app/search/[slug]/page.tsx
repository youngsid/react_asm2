//app/search/[...slug]/page.tsx
export default async function Search(
    {  params } : 
    {  params: { slug:string[] }  }
    ) {
    const  {slug}  = await params;
      // http://localhost:3000/search/dell => slug = ['dell']
      // http://localhost:3000/search/dell/3 => slug = ['dell','3']
    let tu_khoa:string = "" ;
    let page_num:number = 1;
      if (slug.length>=1) tu_khoa = slug[0]   //dell
      if (slug.length>=2) page_num = Number(slug[1]);   //3 
    return (
    <div className="bg-orange-500 text-white p-3 uppercase">
        Tìm kiếm với từ khóa = {tu_khoa} , Trang = {page_num} 
    </div>
    )}