import axios from 'axios';

async function BuscaUser() {
    try{
      const response = await axios.get('https://oncinha.ok.etc.br/perfil.php?nome_user=jogador01')

      const user = {
        nome_usuario: response.data.nome_usuario,
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
        status: response.data.status
        ,
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
        try{
          const response = await axios.get('https://oncinha.ok.etc.br/all_card_user.php?nome_user=jogador01')
  
          return (response.data.itens)
  
        }catch(error){
          console.log("ERRO "+ error)
        }
        
      }

export {BuscaUser, BuscaColecao, Roleta}