import React,{Component} from "react";
import { View, Text, StyleSheet , TouchableOpacity , TextInput, AsyncStorage  } from 'react-native';
import axios from 'axios';


class Register extends Component {


    state={
        username:'',
        email:'',
        password:'',
        age:'',
        gender:'',
    }
    saveData(userInfo){
      AsyncStorage.setItem('_id',(userInfo._id));
      AsyncStorage.setItem('username',(userInfo.username));
      AsyncStorage.setItem('email',(userInfo.email));
      AsyncStorage.setItem('password',(userInfo.password));
      AsyncStorage.setItem('age',(userInfo.age));
      AsyncStorage.setItem('gender',(userInfo.gender));
    }

    addRegistration = () => {
      var that=this;
      const { navigate } = this.props.navigation;
        axios
           .post("http://10.60.243.170:2000/registration", this.state)//Orange ip
          // .post("http://192.168.1.4:2000/registration", this.state)//Home ip

          .then(async function (response) {
            that.saveData(response.data);
            var role= await AsyncStorage.getItem('username');
          // console.log('Role :', role);
          // console.log('Uuuuuuuuuuuuu :', response.data._id);
       
          if(role){
            alert("registaration success")
            navigate('Login',response.data) 
          }
        })
          .catch(error => {
            console.log(error);
          });
    
        console.log('State :', this.state);
      };

    // change = (e,name) =>{
    //     console.log('name :', name);
    //     this.setState({
    //         [name]:e.nativeEvent.text
    //     })
    //  }

   

   render() {
      
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Registration</Text>
        <TextInput style={styles.inputBox} onChangeText={(username) => this.setState({username})} type="text" placeholder="UserName"  />
        <TextInput style={styles.inputBox} onChangeText={(email) => this.setState({email})} autoCompleteType="email" placeholder="Email"  />
        <TextInput style={styles.inputBox} onChangeText={(password) => this.setState({password})} secureTextEntry={true} placeholder="Password"  />
        <TextInput style={styles.inputBox} onChangeText={(age) => this.setState({age})} type="number" placeholder="Age" />
        <TextInput style={styles.inputBox} onChangeText={(gender) => this.setState({gender})} type="text" placeholder="Gender" />
        <TouchableOpacity style={styles.button} onPress={this.addRegistration }>
          <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>  
          {/* <TouchableOpacity 
              onPress={()=> this.props.navigation.replace('Measurment')}>
             <Text>Measurment</Text>
        </TouchableOpacity> */}

        {/* <Button title="Submit" onPress={this.addRegistration }/> */}
{/*   
        <TouchableOpacity 
             onPress={()=> this.props.navigation.navigate('Login')}>
             <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
              onPress={()=> this.props.navigation.replace('Measurment')}>
             <Text>Measurment</Text>
        </TouchableOpacity>
        <TouchableOpacity 
             onPress={()=> this.props.navigation.goBack()}>
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
  header :{
    fontSize: 24,
    color: '#ffffff',
    paddingBottom: 10,
    marginBottom : 10,
    borderBottomColor : '#199187',
    borderBottomWidth: 1,
  }
});




export default Register;

