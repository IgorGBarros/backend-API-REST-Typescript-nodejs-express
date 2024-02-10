import Consultant from "./consultant"
import Product from "./product"

type OrderProduct = {
    request: string
    consultant: Consultant
    product: Product
    quantity: number
    commission: number
    total_amount: number
    total_points: number
    }

export default OrderProduct