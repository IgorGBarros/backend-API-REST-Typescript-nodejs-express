Em um servidor REST, a manipulação de dados é realizada por meio de chamadas HTTP para URLs específicas, conhecidas como endpoints. Cada operação é identificada por uma combinação de URL e método HTTP, como GET, POST, PUT, UPDATE e DELETE.

No contexto do projeto abordado neste tutorial, as operações CRUD (Create, Read, Update e Delete) para a entidade "Item" são definidas da seguinte maneira:

Criar um Novo Item:

Método: POST
URL: /api/itens
Ler Todos os Itens:

Método: GET
URL: /api/itens
Ler um Item Específico:

Método: GET
URL: /api/itens/{id}
Onde {id} é substituído pelo identificador único do item desejado.
Atualizar um Item:

Método: PUT
URL: /api/itens/{id}
Onde {id} é substituído pelo identificador único do item que será atualizado.
Apagar um Item:

Método: DELETE
URL: /api/itens/{id}
Onde {id} é substituído pelo identificador único do item que será removido.
Esses endpoints fornecem as funcionalidades necessárias para realizar operações fundamentais de persistência de dados para a entidade "Item" no contexto deste sistema REST.
