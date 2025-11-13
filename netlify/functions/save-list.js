import { getStore } from "@netlify/blobs";

export default async (req) => {
  try {
    // 1. Pega os dados que o front-end enviou (o nome da pessoa e a lista de presentes)
    const { pessoa, lista } = await req.json();

    if (!pessoa || !lista) {
      return new Response("Dados incompletos", { status: 400 });
    }

    // 2. Define a chave (nome do arquivo)
    const key = `lista-${pessoa}`;

    // 3. Conecta ao banco de dados
    const store = getStore("presentes");

    // 4. Salva (ou sobrescreve) a lista inteira no banco de dados
    await store.setJSON(key, lista);

    // 5. Envia uma resposta de sucesso
    return Response.json({ message: "Lista salva com sucesso!" });

  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};