import NotFound from "@/app/not-found"


export const metadata = {
title: "مشاهده درس",
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