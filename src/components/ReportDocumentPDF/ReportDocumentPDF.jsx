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
    backgroundColor: "#FFFFFF",
    padding: 40,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    borderBottomStyle: "solid",
    marginBottom: 10,
    width: "100%",
  },
  card: {},
  imageSetContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageContainer: {
    flexBasis: "50%",
    paddingBottom: 10,
  },
  sectionLarge: {
    paddingVertical: 14,
  },
  section: {
    paddingVertical: 5,
  },
  notes: {
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    border: "1px solid black",
  },
  name: {
    fontFamily: "Helvetica-Bold",
    color: "#666666",
    fontSize: 15,
  },
  title: {
    fontFamily: "Helvetica-Bold",
    color: "#666666",
    fontSize: 18,
  },
  category: {
    fontFamily: "Helvetica-Bold",
    color: "#8C8C8C",
    fontSize: 13,
    marginVertical: 2,
  },
  text: {
    fontWeight: "thin",
    color: "#6D6E70",
    fontSize: 10,
  },
  textSmall: {
    fontWeight: "thin",
    fontSize: 8,
    color: "#8C8C8C",
  },
});

const ReportDocumentPDF = ({ selectedReport }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.outerContainer}>
          <View style={styles.sectionLarge}>
            <Text style={styles.title}>*Add title support here</Text>
            <Text style={styles.textSmall}>Completed on ...</Text>
          </View>
          {selectedReport?.cards.map((item, index) => {
            let card = item.card;
            return (
              <View key={index} styles={styles.card}>
                <Text style={styles.name}>{card.title}</Text>
                <View style={styles.section}>
                  <Text style={styles.category}>Criteria</Text>
                  <Text style={styles.text}>{card.criteria}</Text>
                </View>
                <View style={styles.imageSetContainer}>
                  {card?.images.map((image, index) => {
                    return image ? (
                      <View
                        style={[
                          styles.imageContainer,
                          {
                            paddingRight: index % 2 == 0 ? 5 : 0,
                            paddingLeft: index % 2 == 0 ? 0 : 5,
                            paddingBottom:
                              card.images.length % 2 == 0
                                ? // looks confusing, just replicates the functions of the gap flex property
                                  index < card.images.length - 2
                                  ? 10
                                  : 0
                                : index < card.images.length - 1
                                ? 10
                                : 0,
                          },
                        ]}
                        key={index}
                      >
                        <Image src={image.imageUrl} alt="" style={styles.image}></Image>
                      </View>
                    ) : (
                      <></>
                    );
                  })}
                </View>
                <View style={styles.section}>
                  {card.notes.length > 0 && <Text style={styles.category}>Notes</Text>}
                  <View>
                    {card.notes?.map((note, index) => {
                      return (
                        <View style={styles.notes} key={index}>
                          <Text style={styles.text}>{note.body}</Text>
                          <Text style={styles.textSmall}>
                            {new Date(note.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
                <View style={styles.hr}></View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default ReportDocumentPDF;
