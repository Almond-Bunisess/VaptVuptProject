import {
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { List, Button } from 'react-native-paper';
import { useContext, useState } from 'react';
import { DataContext } from '../Context';
import pratos from '../pratos';
import styles from '../Styles';

const Carrinho = ({ route, navigation }) => {
  // Obtém o estado de cart e a função setcart do contexto
  const { setcart, cart } = useContext(DataContext);

  // Obtém a largura da janela do dispositivo
  const { screenWidth } = Dimensions.get('window');

  // Função chamada quando o botão + é pressionado
  const handleAddToCart = (id) => {
    // Cria uma cópia do objeto cart
    const cartCopy = { ...cart };

    // Incrementa a quantidade do item no carrinho
    cartCopy[id] = {
      ...cartCopy[id],
      amount: cartCopy[id]?.amount ? cartCopy[id].amount + 1 : 1,
    };

    // Atualiza o estado de cart com a cópia modificada
    setcart(cartCopy);
  };

  // Função chamada quando o botão - é pressionado
  const handleRemoveFromCart = (id) => {
    // Cria uma cópia do objeto cart
    const cartCopy = { ...cart };

    // Decrementa a quantidade do item no carrinho
    cartCopy[id] = {
      ...cartCopy[id],
      amount: cartCopy[id]?.amount ? cartCopy[id].amount - 1 : 0,
    };

    // Remove o item do carrinho se a quantidade for zero
    if (cartCopy[id].amount === 0) delete cartCopy[id];

    // Atualiza o estado de cart com a cópia modificada
    setcart(cartCopy);
  };

  // Função que renderiza cada item no carrinho
  const renderCartItem = (item) => {
    // Obtém as informações do item da lista de pratos
    const { nome, acompanha, imagem } = pratos[item.id];

    // Renderiza o componente List.Item com o nome e descrição da receita
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

  // Renderiza a lista de itens no carrinho usando a função renderCartItem
  return (
    <SafeAreaView>
      <ScrollView>{cart && Object.values(cart).map(renderCartItem)}</ScrollView>
    </SafeAreaView>
  );
};

export default Carrinho;
