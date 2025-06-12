import axios from 'axios';

async function BuscaUser() {
    try{
      const response = await axios.get('https://oncinha.ok.etc.br/perfil.php?nome_user=jogador01')

      const user = {
        nome_usuario: response.data.nome_usuario,
        rodadas: response.data.rodadas,
        moedas: response.data.moedas,
        energia: response.data.rodadas,
        avatar_id: "oioi"
      }
      
      return user

    }catch(error){
      console.log("ERRO "+ error)
    }
    
  }

  async function Roleta() {
    try{
      const response = await axios.get('https://oncinha.ok.etc.br/roleta.php?nome_user=jogador01')

      const DetalhesRoleta = {
        status: response.data.status,
        resultado: response.data.resultado,
        ganhou: response.data.ganhou,
        item_sequencia: response.data.item_sequencia,
        premio: response.data.premio,
        saldo: response.data.saldo,
        moedas: response.data.moedas
    }

      return DetalhesRoleta

    }catch(error){
      console.log("ERRO "+ error)
    }
    
  }

   async function GetItensLoja() {
    try{
      const response = await axios.get('https://oncinha.ok.etc.br/loja.php')


      return response.data.itens

    }catch(error){
      console.log("ERRO "+ error)
    }
  }

  async function EfetuaCompra($user_nome: string, $id_carta: number, $tipo: string) {
    try{
      //const response = await axios.get('https://oncinha.ok.etc.br/efetua_compra.php?nome_user='+ $user_nome + '&id_card=' + $id_carta + '&tipo=' + $tipo)
      const response = await axios.get('https://oncinha.ok.etc.br/efetua_compra.php?nome_user="jogador01"&id_card=6&tipo="Rodada"')

    console.log(response.data)

      const DetalhesRoleta = {
        status: response.data.status,
        resultado: response.data.resultado,
        ganhou: response.data.ganhou,
        item_sequencia: response.data.item_sequencia,
        premio: response.data.premio,
        saldo: response.data.saldo,
        moedas: response.data.moedas
    }


      return DetalhesRoleta

    }catch(error){
      console.log("ERRO "+ error)
    }
    
  }


  async function BuscaColecao() {
     let itens = null

    while (!itens) {
      try {
        const response = await axios.get('https://oncinha.ok.etc.br/all_card_user.php?nome_user=jogador01')
        itens = response.data?.itens

        // Se não houver conteúdo, aguarda um tempo e tenta novamente
        if (!itens || itens.length === 0) {
          console.log("Nenhum dado encontrado, tentando novamente...")
          // Aguarda 2 segundos antes de tentar novamente
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
      } catch (error) {
        console.log("Erro ao tentar buscar dados: " + error)
        // Aguarda 2 segundos antes de tentar novamente
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }
    console.log(itens)
     return itens
  }

export {BuscaUser, BuscaColecao, Roleta, GetItensLoja, EfetuaCompra}