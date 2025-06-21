import axios from 'axios';

async function BuscaUser() {
  try {
    const { data } = await axios.get('https://oncinha.ok.etc.br/perfil.php?nome_user=jogador01');

    return {
      nome_usuario: data.nome_usuario,
      rodadas: data.rodadas,
      moedas: data.moedas,
      energia: data.rodadas,
      avatar_id: "oioi", // esse valor está fixo, confirmar se precisa ser dinâmico
      deck: data.deck,
    };
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}

async function SetDeck(nome_user: string, deck: string,) {
  try {
    const { data } = await axios.get(`https://oncinha.ok.etc.br/set_deck.php?nome_user=${nome_user}&deck=${deck}`);

    return {
      nome_usuario: data.nome_usuario,
      rodadas: data.rodadas,
      moedas: data.moedas,
      energia: data.rodadas,
      avatar_id: "oioi", // esse valor está fixo, confirmar se precisa ser dinâmico
      deck: data.deck,
    };
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}

// Gira a roleta
async function Roleta() {
  try {
    const { data } = await axios.get('https://oncinha.ok.etc.br/roleta.php?nome_user=jogador01');

    console.log(data)
    return {
      status: data.status,
      resultado: data.resultado,
      ganhou: data.ganhou,
      item_sequencia: data.item_sequencia,
      premio: data.premio,
      saldo: data.saldo,
      moedas: data.moedas,
    };
  } catch (error) {
    console.error("Erro na roleta:", error);
    return null;
  }
}


// Busca itens da loja
async function GetItensLoja() {
  try {
    const { data } = await axios.get('https://oncinha.ok.etc.br/loja.php');
    return data.itens;
  } catch (error) {
    console.error("Erro ao buscar itens da loja:", error);
    return [];
  }
}

// Efetua uma compra
async function EfetuaCompra(nome_user: string, id_carta: number, tipo: string) {
  try {
    const url = `https://oncinha.ok.etc.br/efetua_compra.php?nome_user=${nome_user}&id_card=${id_carta}&tipo=${tipo}`;
    const { data } = await axios.get(url);

    console.log(data)
    return {
      status: data.status,
      resultado: data.resultado,
      ganhou: data.ganhou,
      item_sequencia: data.item_sequencia,
      premio: data.premio,
      saldo: data.saldo,
      moedas: data.moedas,
    };
  } catch (error) {
    console.error("Erro ao efetuar compra:", error);
    return null;
  }
}

// Busca toda a coleção do usuário
async function BuscaColecao() {
  let itens = null;

  while (!itens) {
    try {
      const { data } = await axios.get('https://oncinha.ok.etc.br/all_card_user.php?nome_user=jogador01');
      itens = data?.itens;

      if (!itens || itens.length === 0) {
        console.warn("Nenhum item encontrado, tentando novamente...");
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error("Erro ao buscar coleção:", error);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  return itens;
}

async function CadastrarUsuario(nome_usuario: string, senha:string, email:string) {
  try {
    const response = await axios.post('https://oncinha.ok.etc.br/create_user.php', {
      nome_usuario: nome_usuario,
      senha: senha,
      email: email,
    });

    // Verifica se a resposta da API indica sucesso
    if (response.data.status === 'sucesso') {
      return {
        mensagem: 'Cadastro realizado com sucesso!',
        usuarioId: response.data.usuario_id, // Caso a API retorne o ID do usuário
      };
    } else {
      return {
        mensagem: 'Erro no cadastro: ' + response.data.mensagem,
      };
    }
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return {
      mensagem: 'Erro de conexão com a API. Tente novamente.',
    };
  }
}


export {BuscaUser, BuscaColecao, Roleta, GetItensLoja, EfetuaCompra, CadastrarUsuario, SetDeck}