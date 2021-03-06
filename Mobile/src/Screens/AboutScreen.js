import React,{Component} from 'react'
import { SafeAreaView, Text, View,Image,TouchableOpacity,StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import { windowHeight, windowWidth } from '../utils/Dimentions';
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'
import { Caption } from 'react-native-paper'
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
const SECTIONS = [
    {
      title: 'Qui somme nous ?',
      content: "DefibMaghreb a été créée par Cyrille Chicheportiche dans le but d'apporter à toute entreprise, quel que soit sa taille ou son activité, une offre globale pour améliorer la sécurité et les conditions de travail des salariés. Depuis 2010, nous diversifions notre activité pour répondre encore plus largement aux demandes de nos clients. Au fil des années, DefibMaghreb est devenu un acteur leader sur le marché de la Prévention, Santé et Sécurité au Travail. Spécialisé dans la distribution de produits de sécurité et les formations de sécurité, DefibMaghreb est la référence au Maroc pour trouver tous les articles pour travailler en sécurité et protéger l’environnement.",
    },
    {
      title: "C'est quoi un defibrillateur ?",
      content: 'Un défibrillateur automatisé externe (DAE) est un appareil conçu pour administrer une décharge électrique à une personne qui vient d’avoir un arrêt cardiaque. Les DAE ont été développés pour permettre à des non médecins de sauver des vies et aux médecins de gagner du temps.',
    },

    

    
    
    
  ];
  const SECTIONS_defib = [
    {
      title: 'pourquoi avoir un defibrillateur ?',
      content: 'Le défibrillateur sauve des vies. Quand une personne subit un arrêt cardio-respiratoire, le rythme régulier du cœur devient chaotique. Chaque minute sans battement du cœur diminue les chances de survie de 10%. Après 10 minutes sans défibrillation, très peu de gens survivent. La seule thérapie est une défibrillation précoce. ',
    },

    {
      title: "Qu’est-ce qu’un arrêt cardio-respiratoire ? ",
      content: "'L'arrêt cardiorespiratoire est dû à un fonctionnement anormal du système électrique du cœur qui ne permet plus au cœur de propulser le sang vers le cerveau et vers le reste du corps. Il en résulte une perte de conscience brutale avec disparition du pouls et de la respiration. Quand une personne est victime d’un arrêt cardio-respiratoire, le défibrillateur est utilisé pour administrer un choc électrique qui va rétablir un rythme cardiaque normal'",
   },

    

 {
  title: "Quel est le traitement recommandé en cas d’arrêt cardio-respiratoire ?",
  content: 'La défibrillation est la seule thérapie qui permet de rétablir un rythme cardiaque normal. ',
},

  
  ];

  const SECTIONS_utilisation = [
    {
      title: "Ai-je le droit d'utiliser un defibrillateur?",
      content: 'Toute personne même non médecin, est habilité à utiliser un défibrillateur automatisé externe. ',
   },

   {
     title: "Est-ce qu’un défibrillateur est compliqué à utiliser ? ",
     content: 'Le défibrillateur est très simple d’utilisation. Un défibrillateur peut être utilisé par toute personne à qui l’on a montré ce qu’il faut faire. Il est cependant conseillé de suivre une formation, notamment à la réanimation cardio-pulmonaire. ',
  },

  
  ];

  const SECTIONS_maintenance = [
    {
      title: 'Quand dois-je changer de batterie ?',
      content: 'Les défibrillateurs Defibtech sont livrés avec une batterie de 7 ans. Si l’unité est utilisée fréquemment, il se peut que la batterie nécessite un remplacement plus souvent. Tous les jours le défibrillateur autoteste la capacité de sa batterie et informera l’utilisateur lorsque la batterie aura besoin d’être remplacée. ',
  },

  
  ];

  const SECTIONS_achat = [
  

  {
    title: "Qui peut acheter un défibrillateur ?",
    content: 'Tout le monde peut acheter un défibrillateur. Les défibrillateurs Defibtech disposent de toutes les garanties de qualité. ',
 },

 {
  title: "Pourquoi les défibrillateurs Defibtech sont mieux que les autres défibrillateurs ? ",
  content: 'Defibtech a conçu ses défibrillateurs à partir de zéro, en répondant au besoin de simplicité du personnel non médical tout en intégrant la technologie la plus avancée. Les techniques de conception et d’assemblage permettent à Defibtech de vendre ses défibrillateurs au meilleur prix du marché.  ',
},
  ];
  
class AboutScreen extends Component {
    state = {
      activeSections: [],
      activeSections_achat: [],
      activeSections_defib: [],
      activeSections_maintenance: [],
      activeSections_utilisation: [],
    };

    componentDidMount(){
        const parent = this.props.navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: false,  
            tabBarButton: (props) => (
                       <TabBarCustomButton visible
                            {...props}
                        /> ),
      });

      
    }
    componentWillUnmount(){
        const parent = this.props.navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: true,
            tabBarButton: (props) => (
                     <TabBarCustomButton 
                         {...props}
                     />),
        });
    }
  
    _renderSectionTitle = (section) => {
      return (
        <View style={styles.content}>
          <Text style={styles.contentText}>{section.content}</Text>
        </View>
      );
    };
  
    
    _renderHeader(section, index, isActive, sections) {
        return (
          <Animatable.View
          underlayColor={COLORS.WHITE}
            style={{backgroundColor:COLORS.WHITE, padding:10,paddingTop:20,paddingBottom:20, shadowColor: "#000",
                    shadowOffset: {
                    width: 0,
                    height: 7,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 9.51,
                    elevation: 7,
                    backgroundColor: (isActive ? 'rgba(255,255,255,1)' : COLORS.lightGray4) }}
            duration={300}
            transition="backgroundColor">
            <Text style={styles.headerText}>{section.title}</Text>
          </Animatable.View>
        );
      }

      
    
      _renderContent(section, i, isActive, sections) {
        return (
          <Animatable.View
            duration={300}
            transition="backgroundColor"
            style={styles.content}>
            <Animatable.Text
              style={styles.contentText}
              duration={300}
              easing="ease-out"
              animation={isActive ? 'zoomIn' : false}>
              {section.content}
            </Animatable.Text>
          </Animatable.View>
        );
      }
  
    
  
    _updateSections = (activeSections) => {
      this.setState({ activeSections });
    };
    _updateSections_defib = (activeSections_defib) => {
      this.setState({ activeSections_defib });
    };
    _updateSections_maintenance = (activeSections_maintenance) => {
      this.setState({ activeSections_maintenance });
    };
    _updateSections_utilisation = (activeSections_utilisation) => {
      this.setState({ activeSections_utilisation });
    };
    _updateSections_achat = (activeSections_achat) => {
      this.setState({ activeSections_achat });
    };
    
  
    render() {
      return (
        <SafeAreaView style={{backgroundColor:COLORS.WHITE}}>
            <ScrollView >
               {/* Header */}
               <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60, alignItems: 'center',elevation:3 ,backgroundColor:COLORS.WHITE, marginBottom:20}}>
                  <TouchableOpacity
                      style={{ marginLeft: -8 }}
                      onPress={() => this.props.navigation.goBack()}
                  >
                      <Image
                          source={images.back_arrow}
                          resizeMode="contain"
                          style={{
                              width: 30,
                              height: 30,
                              tintColor: COLORS.black
                          }}
                      />
                  </TouchableOpacity>

                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ ...FONTS.h2, color: COLORS.black }}>F.A.Q</Text>
                  </View>

               </View>
               <View style={{padding:15}}>
                    <Accordion
                        sections={SECTIONS}
                        activeSections={this.state.activeSections}
                        //renderSectionTitle={this._renderSectionTitle}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections}
                    />
                    <Text style={styles.titre}> L'utilité d'un defibrillateur :</Text>
                    <Accordion
                        sections={SECTIONS_defib}
                        activeSections={this.state.activeSections_defib}
                        //renderSectionTitle={this._renderSectionTitle}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections_defib}
                    />
                    <Text style={styles.titre}> Facilité d'utilisation :</Text>
                    <Accordion
                        sections={SECTIONS_utilisation}
                        activeSections={this.state.activeSections_utilisation}
                        //renderSectionTitle={this._renderSectionTitle}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections_utilisation}
                    />
                    <Text style={styles.titre}> Maintenance :</Text>
                    <Accordion
                        sections={SECTIONS_maintenance}
                        activeSections={this.state.activeSections_maintenance}
                        //renderSectionTitle={this._renderSectionTitle}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections_maintenance}
                    />
                    <Text style={styles.titre}> Achat d'un defibrillateur :</Text>
                    <Accordion
                        sections={SECTIONS_achat}
                        activeSections={this.state.activeSections_achat}
                        //renderSectionTitle={this._renderSectionTitle}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections_achat}
                    />
               </View>
            </ScrollView>
            
        </SafeAreaView>
        
      );
    }
  }
 
export default AboutScreen

const styles = StyleSheet.create({
    titre : {...FONTS.h4,fontWeight:'bold', color: COLORS.primary, margin:10},
    header :{ backgroundColor:COLORS.WHITE, padding:20, margin:10,  shadowColor: "#000",
                shadowOffset: {
                width: 0,
                height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,
                
            elevation: 5,},
    headerText :{...FONTS.h4, color: COLORS.black, alignSelf:'center'},
    content : { backgroundColor:COLORS.WHITE, padding:20, margin:10, backgroundColor: 'rgba(255,255,255,1)' },
    contentText : {...FONTS.h4, color: "#696969", alignSelf:'center', margin:5, fontFamily:'cochin'},
    
    })