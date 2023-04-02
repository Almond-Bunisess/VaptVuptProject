import { StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SPACING = 10;
const BUTTON_HEIGHT = windowHeight * 0.05;

const styles = StyleSheet.create({
recipeCard: {
marginBottom: SPACING
},
recipeActions: {
display: 'flex',
justifyContent: 'flex-end'
},
snackBar: {
position: 'absolute',
bottom: 0,
width: windowWidth,
paddingVertical: SPACING,
paddingHorizontal: SPACING * 2,
backgroundColor: '#333',
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
},
cartButtons: {
display: 'flex',
flexDirection: 'row',
marginTop: SPACING,
paddingTop: SPACING,
paddingBottom: SPACING,
justifyContent: 'space-around',
alignItems: 'center',
height: BUTTON_HEIGHT,
borderRadius: BUTTON_HEIGHT / 2,
backgroundColor: '#000',
},
});

export default styles;