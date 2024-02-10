import Consultant from "./consultant"
import OrderProduct from "./orderproduct"

type Order = {

    order_number: string
    request: OrderProduct
    consultant: Consultant
    order_date: Date
    total_amount: number
    total_points: number
    captacao :'Presencial'| 'Web'
}
export default Order