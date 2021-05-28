import React,{Component} from 'react'
import { SafeAreaView, Text, View,Image,TouchableOpacity,StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import { windowHeight, windowWidth } from '../utils/Dimentions';
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'
import { Avatar, Button, Card, Title, Paragraph, IconButton  } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
const SECTIONS = [
    {
      title: 'Qui somme nous ?',
      content: "'Lorem ipsum hhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhh ...'",
    },
    {
      title: "C'est qui un defibrillateur ?",
      content: 'Lorem ipsum hhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhh...',
    },

    {
      title: 'pourquoi avoir un defibrillateur ?',
      content: 'Lorem ipsum hhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhh...',
    },

    {
       title: "Ai-je le droit d'utiliser un defibrillateur?",
       content: 'Lorem ipsum hhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhh...',
    },

    {
        title: 'Quand dois-je changer de batterie ?',
        content: '',
    },
    
    
  ];
  
class AboutScreen extends Component {
    state = {
      activeSections: [],
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
            style={{backgroundColor:COLORS.WHITE, padding:15,paddingTop:20,paddingBottom:20,marginBottom:10,  shadowColor: "#000",
             underlayColor:"#ffffff00",
                    shadowOffset: {
                    width: 0,
                    height: 7,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 9.51,
                    
                    elevation: 5,
                    backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}
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
    
  
    render() {
      return (
        <SafeAreaView >
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
                      <Text style={{ ...FONTS.h2, color: COLORS.black }}>Statistique</Text>
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
               </View>
            </ScrollView>
            
        </SafeAreaView>
        
      );
    }
  }
 
export default AboutScreen

const styles = StyleSheet.create({
    header :{ backgroundColor:COLORS.WHITE, padding:20, margin:10,  shadowColor: "#000",
                shadowOffset: {
                width: 0,
                height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,
                
            elevation: 5,},
    headerText :{...FONTS.h2, color: COLORS.black, alignSelf:'center'},
    content : { backgroundColor:COLORS.WHITE, padding:20, margin:10, backgroundColor: 'rgba(255,255,255,1)' },
    contentText : {...FONTS.h4, color: COLORS.black, alignSelf:'center', margin:5},
    
    })