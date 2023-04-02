import { FlatList, SafeAreaView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import pratos from '../pratos.js';
import styles from '../Styles.js';
import React, { useCallback } from 'react';

const Menu = React.memo(({ navigation }) => {
  const renderItem = useCallback(
    ({ item }) => {
      const { id, nome, acompanhamento, imagem } = item;
      return (
        <Card key={id} style={styles.recipeCard}>
          <Card.Title title={nome} subtitle={acompanhamento} />
          <Card.Cover source={{ uri: imagem }} />
          <Card.Actions style={styles.recipeActions}>
            <Button
              onPress={() => {
                navigation.navigate('Detalhes', { receita: item });
              }}>
              Ver detalhes
            </Button>
          </Card.Actions>
        </Card>
      );
    },
    [navigation]
  );

  return (
    <SafeAreaView>
      <FlatList
        data={Object.values(pratos)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
});

export default Menu;
