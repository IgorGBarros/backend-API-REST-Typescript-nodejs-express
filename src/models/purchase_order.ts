import Consultant from "./consultant"
import Product from "./product"

type PurchaseOrder = {
    id?: number
    order_number: string
    product_id: Product
    consultant_id: Consultant
    order_date: Date
    quantity:number
    total_amount: number
    total_points: number
    captacao :'Presencial'| 'Web'
    pay: 'Cartão'|'Boleto'
    delivery_option: string
}
export default PurchaseOrder
