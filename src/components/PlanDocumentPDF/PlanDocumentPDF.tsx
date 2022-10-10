import React from "react";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
  },
  image: {
    height: "220px",
    width: "400px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    margin: 20,
    padding: 10,
    flexGrow: 1,
  },
  description: {
    display: "flex",
    marginLeft: 5,
    marginRight: 5,
    width: "70%",
  },
  text: {
    fontSize: 11,
    margin: "0px 10px 0px 10px",
  },
});

const samplePictureUrl = "https://picsum.photos/200";

const PlanDocumentPDF = ({ selectedPlanCards }: PlanDocumentPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {selectedPlanCards.map((item, index) => {
          return (
            <View key={index} style={styles.container}>
              <Image style={styles.image} source={samplePictureUrl} />
              <View style={styles.description}>
                <Text style={styles.text}>{item}</Text>
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

interface PlanDocumentPDFProps {
  selectedPlanCards: string[];
}

export default PlanDocumentPDF;
