import NotFound from "../not-found"

export const metadata = {
title: "صفحه درس ها",
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