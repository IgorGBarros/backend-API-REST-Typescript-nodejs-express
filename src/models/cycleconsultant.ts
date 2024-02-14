import Consultant from "./consultant"


type CycleConsultant = {
    id?: number
    ciclo_id: Cycle
    consultora_id: Consultant
    point_amount:number
    
}
export default CycleConsultant