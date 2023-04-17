
# Avery Weigh Tronix App

The Application involves development of app developed with React Native.

# Usage
The code can be used for the following operations:

code is for listing License Expiry Details of all Weighbridge.
    
# Procedure
The following is the procedure followed by the code:

#### License Expiry:
1. get userId and userType from local Storage.
2. after getting id and type get License Expiry details by calling api.
3. after receiving data display it and if date is passed then display it in red color.

## Installation
1. Clone the repository.
2. Install the dependencies using yarn.
3. install pod using npx pod install.
4. Run the code with yarn android | yarn ios.

## Code
#### All redux and local states
````
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
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");
````

#### Get userId
````
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
  ````

  #### Get userType
  ````
   const getUserType = async () => {
    try {
      const userTy = await TokenManager.getRole();
      setUserType(userTy?.replace(" ", "")?.toLowerCase());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserType();
  }, []);
  };
  ````

  #### Get license Expiry details
````
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
  ````

  #### Check isPastDate function
  ````
  const isPastDate = (dateToCheck) => {
    return moment().diff(moment(dateToCheck, "DD-MM-YYYY"), "days") > 0;
  };
  ````

  #### Display License details
  
  ````
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
````

## Tech Stack
    React native, Javascript
