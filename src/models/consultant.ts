type Consultant = {
    name: string
    email: string
    data_birth: string // Ou Date, dependendo do formato esperado
    consultant_code: string
    accumulated_points: number
    entry_date: string// Ou Date, dependendo do formato esperado
    total_sales: number
    total_commission: number
    status: 'Ativa' | 'Inativa 1' | 'Inativa 2' | 'Inativa 3' | 'Inativa 4' | 'Inativa 5' | 'Inativa 6'
    last_activity_date: string // Ou Date, dependendo do formato esperado
    street_address: string
    cep: string
    neighborhood: string
    state: string
    phone_number: string
    cpf: string
    level: 'Semente' | 'Bronze' | 'Prata' | 'Ouro' | 'Diamante'
    digital_space_link: string
};

export default Consultant