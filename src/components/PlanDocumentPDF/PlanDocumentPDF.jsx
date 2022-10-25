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
    paddingTop: 40,
  },
  outerContainer: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    margin: "20px 20px 0px 20px",
    padding: 10,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    marginRight: 10,
  },
  image: {
    height: "200px",
    width: "250px",
    marginBottom: 20,
  },
  description: {
    marginLeft: "15%",
    width: "80%",
  },
  text: {
    fontSize: 11,
    margin: "0px 10px 0px 10px",
  },
});

const PlanDocumentPDF = ({ selectedPlanCards }) => {
  console.log(selectedPlanCards);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.outerContainer}>
          {selectedPlanCards.map((card, index) => {
            return (
              <View
                break={card.images.length > 1 && index != 0}
                key={index}
                style={styles.container}
              >
                <View key={index} style={styles.imageContainer}>
                  {card.images.map((image, index) => {
                    {
                      return (
                        image && (
                          <Image key={index} style={styles.image} src={image} />
                        )
                      );
                    }
                  })}
                </View>
                <View style={styles.description}>
                  <Text style={styles.text}>{card.body}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default PlanDocumentPDF;
