import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  AsyncStorage,
  Image
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from "axios";
// import { parse } from "path";

export default class Measurment extends Component {
  state = {
    id: this.props.navigation.state.params,
    bloodSugar: "",
    date: "",
    status: "",
    isDateTimePickerVisible: false,
    meas: [],
    chartV: [],
    // chartV1:[" 1", "2", "3", "4", "5", "6"],
    chartH: [{ data: [1, 2, 3, 4] }]
  };
  saveData(userInfo) {
    AsyncStorage.setItem("_id", userInfo._id);
    AsyncStorage.setItem("bloodSugar", userInfo.bloodSugar);
    AsyncStorage.setItem("date", userInfo.date);
    AsyncStorage.setItem("status", userInfo.status);
  }
  componentMeas() {
    this.showDataMeas();
  }
  showDataMeas = () => {
    axios
      .post("http://192.168.1.4:2000/showDataMeas", this.state)
      .then(({ data }) => {
        console.log("dataaaaaaaaaaaaaaaaaaaa :", data);
        this.setState({ meas: data.measurement });
      })
      .catch(error => {
        console.log(error);
      });
    console.log("measureeeeeeeeeeeeeeeeeeeeement :", measurement);
  };
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  componentDidMount = () => {
    this.addMeasurment();
  };

  addMeasurment = () => {
    axios
      .post("http://10.60.243.170:2000/measurment", this.state)
      .then(response => {
        let bloodSugares = [];

        response.data.measurement.map(item => {
          bloodSugares.push(item.bloodSugar);
        });

        this.setState({ chartV: bloodSugares }, () => {
          console.log(this.state.bloodSugar);
        });
      })
      .catch(error => {
        console.log(error);
      });

    // console.log("State :", this.state);
  };

  render() {
    return (
      <View style={styles.screen}>
        {/* <Text>Measurment screen </Text> */}
        {/* <Text>{this.state.id}</Text> */}

        {/* {
              this.state.bloodSugar.map(item =>{
                console.log('item :', item);
              })
          } */}

        {/* =======================================start Chart=============================================== */}
        <View style={styles.boxState}>
          <LineChart
            data={{
              labels: this.state.chartV,
              // labels1:this.state.chartV1,
              datasets: this.state.chartH
            }}
            width={Dimensions.get("window").width} // from react-native
            height={170}
            //   XAxisSuffix={"D"}
            //   yAxisSuffix={"T"}
            chartConfig={{
              backgroundColor: "red",
              backgroundGradientFrom: "black",
              backgroundGradientTo: "#3889BD",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
              // propsForDots: {
              //   r: "6",
              //   strokeWidth: "2",
              //   stroke: "#ffa726"
              // }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
        {/* =======================================End the Chart=============================================== */}

        {/* <Image style={{width:150 , height:150}}
                  source={require('../../assets/10.png')}
                />  */}

        <View>
          <TextInput
            style={styles.input}
            placeholder="Blood Sugar "
            onChangeText={bloodSugar => this.setState({ bloodSugar })}
          />
        </View>

        <View>
          <TouchableOpacity onPress={this.showDateTimePicker}>
            <TextInput
              style={styles.input}
              placeholder="Date"
              onChangeText={date => this.setState({ date })}
            />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={date => {
                this.setState({ date });
              }}
              onCancel={this.hideDateTimePicker}
              mode={"date"}
              is24Hour={true}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={this.addMeasurment}>
            <Text style={styles.buttonText}>Add MY Measurment</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Your Measurment: {this.state.bloodSugar}</Text>
          <Text>The Date: {this.state.date}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#DCDFE1",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    color: "black",
    textAlign: "center",
    width: 250,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 10
  },

  inputBox: {
    width: 250,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10
  },

  button: {
    width: 300,
    backgroundColor: "#1c313a",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    textAlign: "center"
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  }
});
