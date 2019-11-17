import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native";

// import DatePicker from "react-native-datepicker";
// import TimePicker from "react-native-24h-timepicker";
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from "axios";

export default class DatesMedication extends Component {
  state = {
    id: this.props.navigation.state.params,
    medname: null,
    datetime: null,
    isDateTimePickerVisible: false,
    medic: []
  };

  componentDidMount() {
    this.showData();
  }

  showData = () => {
    axios
      // .post("http://192.168.1.97:2000/showdata", this.state)
       .post("http://192.168.1.4:2000/showdata", this.state)

      .then(({ data }) => {
        console.log("dataaaaaaaaaaaaaaaaaaaa :", data);
        this.setState({ medic: data.medication });
      })
      .catch(error => {
        console.log(error);
      });
    // console.log('medicccccccccccccccccccccccccccccccccc :', medic);
  };


  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.

  handelSubmit = () => {
    //192.168.1.97 home
    //10.60.243.107 orange
    axios
      // .post("http://192.168.1.97:2000/medication", this.state) //Orange ip
      .post("http://192.168.1.4:2000/registration", this.state)//Home ip
      .then(({ data }) => {
        console.log(data);
        this.setState({
          medic: data.medication
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
  
    return (
      <View style={styles.container}>

        <View style={styles.imageIcon}>
          <Image
            style={{ width: 150, height: 150 }}
            source={require("../../assets/pic.png")}
          />
        </View>
        <View style={styles.inputButton}>
          <TextInput
            style={styles.inputBox}
            placeholder="medic"
            onChangeText={medname => this.setState({ medname })}
          />

          <TouchableOpacity onPress={this.showDateTimePicker}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../assets/pic.png")}
            />

            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={datetime => {
                this.setState({ datetime });
              }}
              onCancel={this.hideDateTimePicker}
              mode={"datetime"}
              is24Hour={true}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>

          <FlatList
            data={this.state.medic}
            renderItem={({ item }) => {
              console.log("item :", item);
              return (

                <ScrollView>
                  <View style={styles.card}>
                    <Text>Name of Medic: {item.medname}</Text>
                    <Text style={styles.dateCard}>Date: {item.datetime}</Text>
                  </View>
                </ScrollView>
              );
            }}
            keyExtractor={item => item._id}
          />
        </View>

        <View style={styles.buttonAdd}>
          <Button title="ADD MEDIC" onPress={this.handelSubmit} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    height: "100%"

    // justifyContent : 'center'
  },
  imageIcon: {
    alignItems: "center"
  },
  inputBox: {
    width: 300,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000000",
    marginVertical: 10
  },
  inputButton: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  card: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "rgb(255, 255, 255)",
    width: 350,
    height: 60,
    padding: 10
  },
  dateCard: {
    position: "absolute",
    bottom: 5,
    right: 5,
    fontSize: 10,
    color: "#565656"
  },
  buttonAdd: {
    position: "absolute",
    bottom: 0,
    // justifyContent: 'center',
    // alignItems: 'center',
    width: "100%",
    flex: 1
  }
});