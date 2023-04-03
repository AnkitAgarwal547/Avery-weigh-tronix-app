import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Rating } from "react-native-ratings";
import { connect, useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input";
import Screen from "../../components/screen/screen";
import TriangleButton from "../../components/TriangleButton";
import { getLicenseExpiryDetails } from "../../redux/actions/adminAction";
import { getUserDetails } from "../../redux/actions/authAction";
import { horizontalScale } from "../../utils/basicStyles";
import TokenManager from "../../utils/TokenManager";
import styles from "./styles/LicenceExpiry.styles";
import moment from "moment";

const LicenseExpiry = ({ navigation, getUserDetailsDispatch, user }) => {
  const dispatch = useDispatch();
  const licenseData = useSelector((state) =>
    state.getIn(["admin", "licenseData"])
  );
  const dashboardPlantID = useSelector((state) =>
    state.getIn(["global", "dashboardPlantID"])
  );
  const dashboardWbID = useSelector((state) =>
    state.getIn(["global", "dashboardWbID"])
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(false);
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");
  const gerUserType = async () => {
    try {
      const userTy = await TokenManager.getRole();
      setUserType(userTy?.replace(" ", "")?.toLowerCase());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gerUserType();
  }, []);
  const gerUserId = async () => {
    try {
      const userId = await TokenManager.retrieveUserId();
      setUserId(userId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gerUserId();
  }, []);

  const isPastDate = (dateToCheck) => {
    return moment().diff(moment(dateToCheck, "DD-MM-YYYY"), "days") > 0;
  };

  useFocusEffect(
    React.useCallback(() => {
      if (
        userId &&
        userType &&
        dashboardPlantID !== "" &&
        dashboardWbID !== "" &&
        dashboardPlantID &&
        dashboardWbID
      ) {
        dispatch(
          getLicenseExpiryDetails({
            UserId: userId,
            UserType: userType,
            PlantCode: dashboardPlantID,
            WeighbridgeId: dashboardWbID,
          })
        );
      } else if (
        userId &&
        userType &&
        dashboardPlantID !== "" &&
        dashboardPlantID
      ) {
        dispatch(
          getLicenseExpiryDetails({
            UserId: userId,
            UserType: userType,
            PlantCode: dashboardPlantID,
          })
        );
      } else if (
        userId &&
        userType &&
        userType?.replace(" ", "")?.toLowerCase() === "user"
      ) {
        dispatch(
          getLicenseExpiryDetails({
            UserId: userId,
            UserType: userType,
          })
        );
      } else if (userId && userType) {
        dispatch(
          getLicenseExpiryDetails({
            UserId: userId,
            UserType: userType,
          })
        );
      }
    }, [userId, userType, dashboardWbID, dashboardPlantID])
  );

  return (
    <Screen title="AMC Status" navigation={navigation}>
      <ScrollView
        overScrollMode="never"
        scrollToOverflowEnabled={false}
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
      >
        {licenseData?.map((i) => (
          <View style={styles.container}>
            <View style={styles.licenseExpiryWrapper}>
              <View style={styles.dropDownContainer}>
                <Text style={styles.titleText}>Plant ID:</Text>
                <Text style={styles.titleValueText}>{i.plantId}</Text>
              </View>
              <View style={styles.dropDownContainer}>
                <Text style={styles.titleText}>WB ID:</Text>
                <Text style={styles.titleValueText}>{i.wbId}</Text>
              </View>
              <View style={styles.dropDownContainer}>
                <Text style={styles.titleText}>Machine ID:</Text>
                <Text style={styles.titleValueText}>{i.machineId}</Text>
              </View>
              <View style={styles.dropDownContainer}>
                <Text style={styles.titleText}>INSTALLED ON:</Text>
                <Text style={styles.titleValueText}>{i.installedOn}</Text>
              </View>
              <View style={styles.dropDownContainer}>
                <Text style={styles.titleText}>AMC EXP DATE:</Text>
                <Text
                  style={[
                    styles.titleValueText,
                    isPastDate(i.amc_Exp_Date) && styles.titleValueTextRed,
                  ]}
                >
                  {i.amc_Exp_Date}
                </Text>
              </View>
              <View style={styles.dropDownContainer}>
                <Text style={styles.titleText}>STAMPING DUE DATE:</Text>
                <Text
                  style={[
                    styles.titleValueText,
                    isPastDate(i.stamp_Due_Date) && styles.titleValueTextRed,
                  ]}
                >
                  {i.stamp_Due_Date}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
};

const mapStateToProps = (state) => ({
  user: state.getIn(["auth", "user"]),
});

//map redux dispach methods to props
const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetailsDispatch: (data) => dispatch(getUserDetails(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LicenseExpiry);
