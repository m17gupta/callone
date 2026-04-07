"use client"

import GetAllTravisMethew from "./travismethew/GetAllTravisMethew"
import GetAllBrands from "../brands/GetAllBrands"
import GetAllAtributeSet from "../attributeSet/GetAllAtributeSet"
import GetAllOgio from "./Ogio/GetAllOgio"
import GetAllHardGood from "./HardGood/GetAllHardGood"
import GetAllRoleBasedUser from "../auth/GetAllRoleBasedUser"
import GetAllOrders from "../order/GetAllOrders"
import GetAllSoftGood from "./callaway-softgoods/GetAllSoftGood"


const GetAllProducts = () => {
   
    return (
        <>
        <GetAllAtributeSet/>
        <GetAllBrands/>
        <GetAllTravisMethew/>
        <GetAllOgio/>
        <GetAllHardGood/>
        <GetAllRoleBasedUser/>
        <GetAllOrders/>
        <GetAllSoftGood/>
        </>
    )
}

export default GetAllProducts