// Importa os componentes necessários do React e do React Navigation
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Importa os componentes personalizados
import ComidaClick from './components/ComidaClick'
import Carrinho from './components/Carrinho'
import Menu  from './components/Menu'

// Importa o Contexto
import Context from './Context';

// Cria um Drawer Navigator
const Drawer = createDrawerNavigator();

// Componente principal do aplicativo
export default function App(){
  return (
    // Adiciona o Context Provider para compartilhar dados em todo o aplicativo
    <Context>
      {/* Container de Navegação */}
      <NavigationContainer>
        {/* Navegador do Drawer */}
        <Drawer.Navigator
          // Opções de Navegação
          screenOptions={({ route }) => ({
            // Ícone da Aba
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Restaurante Vapt Vupt') {
                return <Ionicons name='fast-food' size={size} color={color} />;
              } else if (route.name === 'Carrinho') {
                return <Ionicons name='shopping-cart' size={size} color={color} />;
              }
            },
            // Cor da Aba Inativa
            tabBarInactiveTintColor: 'gray',
            // Cor da Aba Ativa
            tabBarActiveTintColor: 'dodgerblue',
          })}
          // Usar Implementação Legada
          useLegacyImplementation
          // Rota Inicial
          initialRouteName="Restaurante Vapt Vupt">
          {/* Tela do Menu */}
          <Drawer.Screen name="Restaurante Vapt Vupt" component={Menu} options={{tabBarStyle: { display: "none" }, tabBarButton: () => null }}/>
          {/* Tela de Detalhes */}
          <Drawer.Screen name="Detalhes" component={ComidaClick} options={{
            drawerItemStyle: { height: 0 }
          }} />
          {/* Tela do Carrinho */}
          <Drawer.Screen name="Carrinho" component={Carrinho}/>
        </Drawer.Navigator>
      </NavigationContainer>
    </Context>
  )
}
