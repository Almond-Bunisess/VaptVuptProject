// importa os componentes personalizados e necessários do react
import { useState, useEffect } from 'react';
import { SafeAreaView, Dimensions, ScrollView, View } from 'react-native';
import { List, Button } from 'react-native-paper';
import firebase from '../Firebase';
import styles from '../Styles';

// Define a função Endereco que recebe um objeto navigation como parâmetro
const Endereco = ({ navigation }) => {
  // Obtém a largura e altura da tela do dispositivo
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Define um estado inicial vazio para a lista de endereços
  const [enderecos, setEnderecos] = useState([]);

  // Função responsável por buscar os endereços no Firebase
  const fetchEnderecos = () => {
    // Cria um array vazio para armazenar os endereços encontrados
    const items = [];

    // Obtém a referência para a coleção "enderecos" do Firebase, ordenando os resultados pelo campo "logradouro"
    const ref = firebase.database().ref('enderecos').orderByChild('logradouro');

    // Função responsável por lidar com os dados retornados pelo Firebase
    const handleData = (snapshot) => {
      // Itera sobre cada linha retornada pelo Firebase
      snapshot.forEach((linha) => {
        // Cria um objeto com os dados do endereço encontrado
        const endereco = {
          key: linha.key,
          endereco_tipo: linha.val().endereco_tipo,
          logradouro: linha.val().logradouro,
          numero: linha.val().numero,
          bairro: linha.val().bairro,
          cidade: linha.val().cidade,
          estado: linha.val().estado,
        };

        // Adiciona o objeto de endereço ao array de itens encontrados
        items.push(endereco);
      });

      // Define o estado da lista de endereços com os itens encontrados
      setEnderecos(items);
    };

    // Registra a função "handleData" para ser chamada sempre que houver mudanças na coleção "enderecos" do Firebase
    ref.on('value', handleData, (error) => {
      console.log(error);
    });
  };

  // Define a função "excluirEndereco" que recebe o parâmetro "endrKey"
  const excluirEndereco = async (endrKey) => {
    try {
      // Remove o endereço do Firebase com a chave "endrKey"
      await firebase.database().ref(`enderecos/${endrKey}`).remove();

      // Atualiza a lista de endereços
      fetchEnderecos();

      // Exibe uma mensagem de sucesso na tela
      alert('Endereço Excluído');
    } catch (e) {
      // Exibe uma mensagem de erro caso ocorra algum problema ao excluir o endereço
      alert(`Erro ao excluir endereço: ${e}`);
    }
  };

  // Utiliza o hook useEffect para buscar a lista de endereços sempre que a tela for exibida
  useEffect(() => {
    // Registra a função "fetchEnderecos" para ser chamada sempre que a tela for exibida
    const unsubscribe = navigation.addListener('focus', () => {
      fetchEnderecos();
    });

    // Retorna a função "unsubscribe" para remover o listener quando a tela for fechada
    return unsubscribe;
  }, [navigation]);

  // Retorna a interface da tela de endereços, utilizando o React Native
  return (
    <ScrollView>
      <SafeAreaView>
        {enderecos &&
          enderecos.map((endereco) => (
            <>
              <List.Item
                key={endereco.key}
                title={`${endereco.endereco_tipo}: ${endereco.logradouro} - ${endereco.numero}`}
                description={`${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`}
              />
              <View style={styles.carrinhoBotoes}>
                <Button
                  mode="contained"
                  onPress={() => excluirEndereco(endereco.key)}>
                  Excluir
                </Button>
              </View>
            </>
          ))}
        <Button onPress={() => navigation.navigate('Novo Endereço')}>
          Novo
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Endereco;