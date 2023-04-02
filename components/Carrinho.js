import {
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { List, Button, TextInput } from 'react-native-paper';
import { useContext, useState } from 'react';
import { DataContext } from '../Context';
import pratos from '../pratos';
import styles from '../Styles';
import firebase from '../Firebase';

const Carrinho = ({ route, navigation }) => {

  const { setcart, cart } = useContext(DataContext);


  const { screenWidth } = Dimensions.get('window');

  const [email, setEmail] = useState('');

 
  const handleAddToCart = (id) => {

    const cartCopy = { ...cart };


    cartCopy[id] = {
      ...cartCopy[id],
      amount: cartCopy[id]?.amount ? cartCopy[id].amount + 1 : 1,
    };


    setcart(cartCopy);
  };


  const handleRemoveFromCart = (id) => {

    const cartCopy = { ...cart };


    cartCopy[id] = {
      ...cartCopy[id],
      amount: cartCopy[id]?.amount ? cartCopy[id].amount - 1 : 0,
    };


    if (cartCopy[id].amount === 0) delete cartCopy[id];


    setcart(cartCopy);
  };

  const cadastrarPedidoNoBanco = () => {
    if (Object.values(cart).length == 0 || !cart) {
      alert('Não há pedidos para cadastrar');
      return;
    }

    if (
      email == '' ||
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      alert('Insira um e-mail válido para cadastrar o pedido.');
      return;
    }

try {
  const items = Object.keys(cart).map((id) => ({
    id: cart[id].id,
    amount: cart[id].amount,
    nome: pratos[cart[id].id].nome, // inclui o nome do item no objeto enviado para o Firebase
  }));
  firebase.database().ref('pedidos').push({
    email_usuario: email,
    pedido: items,
  });
  setEmail('');
  setcart(null);
  alert('Pedido cadastrado com sucesso');
} catch (e) {
  alert('Erro ao cadastrar pedido: ' + e);
}
  };


  const renderCartItem = (item) => {

    const { nome, acompanha, imagem } = pratos[item.id];


    return (
      <>
        <List.Item title={nome} description={acompanha} />

        <Image
          source={{ uri: imagem }}
          style={{ width: screenWidth, height: 300 }}
        />

        <View style={styles.cartBotoes}>
          <Button
            icon="plus"
            mode="contained"
            style={{ width: 20 }}
            onPress={() => handleAddToCart(item.id)}
          />
          <Text>{item.amount}</Text>
          <Button
            icon="minus"
            mode="contained"
            style={{ width: 20 }}
            onPress={() => handleRemoveFromCart(item.id)}
          />
        </View>
      </>
    );
  };

return (
  <SafeAreaView>
    <ScrollView>
      {cart ? Object.values(cart).map(renderCartItem) : null}
      <TextInput
        label="Email"
        Placeholder="Insira seu e-mail"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      {cart && <Button onPress={() => cadastrarPedidoNoBanco()}>Finalizar compra</Button>}
    </ScrollView>
  </SafeAreaView>
);
};

export default Carrinho;
