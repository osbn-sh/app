import NotFound from "@/app/not-found"



export const metadata = {
  title: "مشاهده اساتید",
}

const page =() => {
const isAllowed=false
if(!isAllowed){
    return(
        <NotFound/>
        
    )
}
}
export default page