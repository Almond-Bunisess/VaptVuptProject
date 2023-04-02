import { SafeAreaView } from 'react-native';
import { Button, Card, Snackbar } from 'react-native-paper';
import { useContext, useState, useCallback } from 'react';
import { DataContext } from '../Context';
import styles from '../Styles.js';

const ComidaClick = ({ route, navigation }) => {
  const { setcart, cart } = useContext(DataContext);
  const { receita } = route.params;
  const [visible, setVisible] = useState(false);

const addToCart = useCallback(
  (id) => {
    setcart((cartCopy) => {
      const newCart = { ...cartCopy };
      if (newCart?.[id]) {
        newCart[id].amount += 1;
      } else {
        const item = {
          id,
          amount: 1,
          nome: receita.nome,
        };
        newCart[id] = item;
      }
      setVisible(true);
      return newCart;
    });
  },
  [setcart, receita.nome]
);


  return (
    <SafeAreaView>
      <Card style={styles.recipeCard}>
        <Card.Title title={receita.nome} subtitle={receita.acompanha} />
        <Card.Cover source={{ uri: receita.imagem }} />
        <Card.Actions style={styles.recipeActions}>
          <Button
            onPress={() => {
              setVisible(false);
              navigation.navigate('Restaurante Vapt Vupt');
            }}>
            Cancelar
          </Button>
          <Button
            onPress={() => {
              addToCart(receita.id);
            }}>
            Adicionar ao carrinho
          </Button>
        </Card.Actions>
      </Card>
      <Snackbar
        style={styles.snackBar}
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Ok',
          onPress: () => {
            setVisible(false);
          },
        }}>
        Produto adicionado ao carrinho
      </Snackbar>
    </SafeAreaView>
  );
};

export default ComidaClick;
