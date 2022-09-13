      import { View, Image, FlatList } from 'react-native';

      import logoImg from '../../assets/logo-nlw-esports.png';
    import { Headling } from '../../components/Headling';
      import { styles } from './styles';

      import { GAMES } from '../../utils/games'
    import { GameCard } from '../../components/GameCard';

      export function Home() {
        return (
          <View style={styles.container}>
            <Image
              source={logoImg} 
              style={styles.logo}/>
            <Headling 
              title='Encontre seu duo!'
              subtitle='Selecione o game que deseja jogar...'/>

              <FlatList 
              data={GAMES}
              keyExtractor={item => item.id}
              renderItem={({item})=>
            (
              <GameCard 
              data={item}
              />
            )}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={styles.contentList}
              />
          
          </View>
        );
      }