import NotFound from "../not-found"

export const metadata = {
title: "صفحه درس ها",
}
const page = async() => {
const isAllowed=false
if(!isAllowed){
    return(
        <NotFound/>
    )
}
}



export default page