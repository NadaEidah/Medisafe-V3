import React,{Component} from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Image,
  Button,
  AsyncStorage
 } from 'react-native';
import axios from 'axios';


class Login extends Component {

    state = {
        email: "",
        password: ""
      }; 

    saveData(userInfo){
        AsyncStorage.setItem('username',(userInfo.email));
        AsyncStorage.setItem('email',(userInfo.password));
        AsyncStorage.setItem('_id',(userInfo._id));
      }  

    userLogin = ()=>{
       var that=this;
       const { navigate } = this.props.navigation;
        // console.log('loginUser :', loginUser )
        axios
       .post("http://10.60.243.170:2000/login", this.state)//Orange ip
      //  .post("http://192.168.1.4:2000/login", this.state)//Home ip

        .then(async function (response){
          that.saveData(response.data);
          var role= await AsyncStorage.getItem('_id');
          console.log('Uuuuuuuuuuuuu :', response.data._id);

          if(role){
            navigate('Profile',response.data)
          }
        })
        .catch(error => {
          console.log(error);
        });
    
    
      }
    

      // logUser = (e, name) => {
      //   this.setState({
      //     [name]: e.nativeEvent.text
      //   });
      // };
    
   
      render() {
        return(
            <View style={styles.container}>
             
                <Image style={{width:85 , height:85}}
                  source={require('../../assets/pic.png')}
                />
               
                <Text style={styles.logoText}>Medisafe App</Text>
                <TextInput style={styles.inputBox}
                    onChangeText={(email) => this.setState({email})}
                    autoCompleteType="email"
                    placeholder="Email"
                    placeholderTextColor= "#ffffff"
                />
                <TextInput style={styles.inputBox}
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor= "#ffffff"
                />
                <TouchableOpacity style={styles.button}
                  onPress={this.userLogin }>
                  <Text style={styles.buttonText}>Login</Text>

                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.button}
                  onPress={()=>{this.props.navigation.navigate('Measurment');}}>
                  <Text style={styles.buttonText}>Measurment</Text>

                </TouchableOpacity> */}
                <View style={styles.signupTextCont}>
                  <TouchableOpacity style={styles.signupText}
                    onPress={()=>{
                      this.props.navigation.navigate('Register');
                  }}><Text>Signup</Text>
                  </TouchableOpacity>
                  <Text style={styles.signupText}>Don't have an account yet? </Text>
                </View>


                {/* <TouchableOpacity 
                    onPress={()=> props.navigation.goBack()}>
                    <Text>Go Back</Text>
                </TouchableOpacity> */}
            </View>
        );
      }
}

const styles = StyleSheet.create({
    container : {
      backgroundColor: '#37474F',
      flex: 1,
      alignItems : 'center',
      justifyContent : 'center'
    },
    logoText : {
      marginVertical: 15,
      fontSize: 18,
      color: '#ffffff'
    },
    inputBox : {
      width : 300,
      backgroundColor : 'rgba(255, 255, 255, 0.3)',
      borderRadius: 25,
      paddingHorizontal : 16,
      fontSize: 16,
      color: '#ffffff',
      marginVertical: 10
    },
    buttonText : {
      fontSize: 16,
      fontWeight: '500',
      color: '#ffffff',
      textAlign : 'center'
    },
    button :{
     width : 300,
     backgroundColor: '#1c313a',
     borderRadius: 25,
     marginVertical: 10,
     paddingVertical: 13
    },
    signupTextCont : {
      // flexGrow: 1,
      alignItems:'flex-end',
      justifyContent: 'center',
      paddingVertical: 16,
      flexDirection: 'row'
    },
    signupText : {
      color: 'rgba(255,255,255,0.7)',
      fontSize:16
    },
    signupButton: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight:'500'
    }
});


export default Login ;