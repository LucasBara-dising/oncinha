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


// Função assíncrona para iniciar o jogo
async function IniciaJogo(nome_user:string, deck: string, deckBot:string) {
  console.log(nome_user, deck, deckBot)
  try {
    // URL da API com parâmetros
    //const url = `https://oncinha.ok.etc.br/inicia_jogo.php?nome_user=${nome_user}&deck=${deck}&deckBot=${deckBot}`;
    const url = `https://oncinha.ok.etc.br/inicia_jogo.php?nome_user=jogador01&deck=1,2,3,4,5,6&deck_bot=1,2,3,4,5,6`;
    
    // Realizando a requisição GET
    const { data } = await axios.get(url);

    // Exibindo os dados no console
    console.log(data);

    // Retornando os dados estruturados como um objeto
    return {
      status: data.status,
      resultado: data.resultado,
      jogador_id: data.jogador_id,
      hp_jogador: data.hp_jogador,
      hp_bot: data.hp_bot,
      deck_jogador: data.deck_jogador,
      deck_bot: data.deck_bot,
    };
  } catch (error) {
    // Tratamento de erro
    console.error("Erro ao iniciar o jogo:",  error);
    return null;
  }
}

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

//  const handlePostRequest = async () => {
//     try {
//       const data = { nome_user, deck, deck_bot, carta, carta_bot, vida_user,energia_user,vida_bot,energia_bot };

//       const res = await fetch('https://oncinha.ok.etc.br/teste.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data), // Converte o objeto para JSON
//       });

//       const result = await res.json(); // Converte a resposta para JSON
//       setResponse(result); // Armazena a resposta
//       console.log(response)
//     } catch (error) {
//       console.error('Erro na requisição:', error);
//       //setResponse({ status: 'error', mensagem: 'Ocorreu um erro na requisição.' });
//     }
//   };


export {BuscaUser, BuscaColecao, Roleta, GetItensLoja, EfetuaCompra, CadastrarUsuario, SetDeck, IniciaJogo}