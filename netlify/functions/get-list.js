import { getStore } from "@netlify/blobs";

export default async (req) => {
  try {
    // 1. Pega o nome da pessoa da URL (ex: .../get-list?pessoa=luana)
    const url = new URL(req.url);
    const pessoa = url.searchParams.get("pessoa");

    if (!pessoa) {
      return new Response("Pessoa não especificada", { status: 400 });
    }
    
    // 2. Define a "chave" da lista (o nome do arquivo no banco de dados)
    const key = `lista-${pessoa}`;
    
    // 3. Conecta ao nosso banco de dados (Netlify Blobs)
    // "presentes" é o nome do nosso "depósito" de dados
    const store = getStore("presentes"); 

    // 4. Tenta pegar a lista
    const lista = await store.get(key, { type: "json" });

    // 5. Envia a lista de volta para o front-end
    // Se a lista não existir (lista === null), envia uma array vazia [].
    return Response.json(lista || []);

  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};