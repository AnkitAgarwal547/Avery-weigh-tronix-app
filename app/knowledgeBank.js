import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { TextInput, View, Text, Modal, Dimensions, Image } from "react-native";
import { Pressable } from "react-native";
import {
  brandColors,
  horizontalScale,
} from "../../components/Core/basicStyles";
import Screen from "../../components/screen/screen";
import TableComponent from "../../components/TableComponent";
import { IC_PdfIcon, IC_PdfLine, IC_Url } from "../../utils/images";

import styles from "./styles/KnowledgeBank.styles";

const { width } = Dimensions.get("window");

const screenWidth = width - horizontalScale(36);

const tableHead = ["S. No.", "Title", "URL/PDF"];

const columnWidth = [screenWidth * 0.2, screenWidth * 0.5, screenWidth * 0.3];

const KnowledgeBank = ({ style }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const finalTableData = tableData2.map((row, rowIndex) => {
      const finalRow = row.map((cell, index) => {
        return index === 2 ? (
          <View style={styles.tableUrlContainer}>
            <Image
              style={[
                styles.tableUrlIcon,
                rowIndex % 2 === 0 && styles.opacity,
              ]}
              source={IC_Url}
            />
            <Image style={[styles.tableUrlIcon]} source={IC_PdfLine} />
            <Image
              style={[
                styles.tableUrlIcon,
                rowIndex % 2 !== 0 && styles.opacity,
              ]}
              source={IC_PdfIcon}
            />
          </View>
        ) : (
          cell
        );
      });
      return finalRow;
    });
    setTableData(finalTableData);
  }, []);

  return (
    <Screen title={"Knowledge Bank"}>
      <View style={[styles.mainWrapper, style]}>
        <TableComponent
          tableHead={tableHead}
          tableData={tableData}
          columnWidth={columnWidth}
          style={styles.table}
        />
      </View>
    </Screen>
  );
};

export default KnowledgeBank;
