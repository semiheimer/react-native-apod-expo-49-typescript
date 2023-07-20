import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Pressable,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDateForAPI } from "../utils";

const SelectDate = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [selectedButton, setSelectedButton] = useState("start");

  const showPicker = (type: string) => {
    setSelectedButton(type);
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    if (selectedButton === "start") {
      if (value <= endDate) {
        setStartDate(formatDateForAPI(value));
      } else {
        Alert.alert("Warning", "Start date cannot be after the end date.", [
          { text: "OK" },
        ]);
      }
    }
    if (selectedButton === "end") {
      if (value <= new Date() && value >= startDate) {
        setEndDate(formatDateForAPI(value));
      } else {
        Alert.alert("Warning", "End date cannot be before the start date.", [
          { text: "OK" },
        ]);
      }
    }
    setIsPickerShow(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.pickedDateContainer}>
        <Pressable onPress={() => showPicker("start")}>
          <Text style={styles.startPickedDate}>
            Selected Start Date: {startDate.toLocaleDateString()}
            <Icon name="caret-down" size={20} color="black" />
          </Text>
        </Pressable>
      </View>
      <View style={{ height: 10 }}></View>
      <View style={styles.pickedDateContainer}>
        <Pressable onPress={() => showPicker("end")}>
          <Text style={styles.endPickedDate}>
            Selected End Date: {endDate.toLocaleDateString()}
            <Icon name="caret-down" size={20} color="black" />
          </Text>
        </Pressable>
      </View>
      {isPickerShow && (
        <DateTimePicker
          value={startDate}
          mode={"date"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={true}
          onChange={onChange}
          style={styles.datePicker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    marginVertical: 20,
  },
  pickedDateContainer: {
    padding: 4,
    borderRadius: 30,
    backgroundColor: "#e5e5e5",
    width: 290,
    borderWidth: 2,
    borderColor: "#cccccc",
  },
  startPickedDate: {
    fontSize: 18,
    textAlign: "center",
  },
  endPickedDate: {
    fontSize: 18,
    textAlign: "center",
  },
  datePicker: {
    width: 320,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default SelectDate;
