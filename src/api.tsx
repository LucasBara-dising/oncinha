import axios from 'axios';



async function BuscaUser() {
    try{
      const response = await axios.get('https://oncinha.ok.etc.br/perfil.php?nome_user=jogador01')

      const user = {
        nome_usuario: response.data.nome_usuario,
        moedas: response.data.moedas,
        energia: response.data.energia,
        avatar_id: "oioi"
      }
      
      return user

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

export {BuscaUser, BuscaColecao}