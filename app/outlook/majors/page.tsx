import NotFound from "@/app/not-found"

export const metadata = {
title: "مشاهده رشته ها",
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