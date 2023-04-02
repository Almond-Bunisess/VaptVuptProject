import { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import firebase from '../Firebase';

const EnderecoNY = ({ route, navigation }) => {
  const [endereco, setEndereco] = useState({
    endereco_tipo: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  const atualizarEndereco = (nome, valor) => {
    setEndereco({
      ...endereco,
      [nome]: valor,
    });
  };

  const cadastrarNoBanco = async () => {
    try {
      await firebase.database().ref('enderecos').push(endereco);
      setEndereco({
        endereco_tipo: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
      });
      alert('Registro salvo com sucesso');
    } catch (error) {
      alert(`Erro ao cadastrar endereço: ${error.message}`);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          label="Informe o tipo do endereço"
          onChangeText={(text) => atualizarEndereco('endereco_tipo', text)}
          value={endereco.endereco_tipo}
        />
        <TextInput
          label="Informe o logradouro"
          onChangeText={(text) => atualizarEndereco('logradouro', text)}
          value={endereco.logradouro}
        />
        <TextInput
          label="Informe o número"
          onChangeText={(text) => atualizarEndereco('numero', text)}
          keyboardType="numeric"
          value={endereco.numero}
        />
        <TextInput
          label="Informe o bairro"
          onChangeText={(text) => atualizarEndereco('bairro', text)}
          value={endereco.bairro}
        />
        <TextInput
          label="Informe a cidade"
          onChangeText={(text) => atualizarEndereco('cidade', text)}
          value={endereco.cidade}
        />
        <TextInput
          label="Informe o estado"
          onChangeText={(text) => atualizarEndereco('estado', text)}
          value={endereco.estado}
        />
        <Button onPress={cadastrarNoBanco}>Salvar</Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EnderecoNY;