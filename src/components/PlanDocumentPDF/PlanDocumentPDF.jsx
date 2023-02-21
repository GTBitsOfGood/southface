import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

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
    marginTop: "5%",
    width: "80%",
  },
  text: {
    fontSize: 11,
    margin: "0px 10px 0px 10px",
  },
});

const PlanDocumentPDF = ({ selectedPlanCards }) => {
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
                          <Image
                            key={index}
                            style={styles.image}
                            src={image}
                            alt="construction-image"
                          />
                        )
                      );
                    }
                  })}
                </View>
                <View style={styles.description}>
                  {card.notes.map((comment, index) => {
                    {
                      return (
                        comment.body && (
                          <Text key={index} style={styles.text}>
                            {comment.body}
                          </Text>
                        )
                      );
                    }
                  })}
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
