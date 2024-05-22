import * as Native from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "./react-native-table-component";

import { Fragment } from "react";

export type TableProps = {
  widthArr?: any;
  onPressRow?: any;
  onCheckRow?: any;
  tableTitle: string;
  dataSource: any[];
  loading?: boolean;
  emptyDesc?: String;
  tableHeader: any[];
  tableStyle?: string;
  isRowPressAble?: Boolean;
  isShowCheckBox?: Boolean;
  isShowCheckBoxOther?: Boolean;
  cellStyle?: any;
};

export default (props: TableProps) => {
  const tableHeader = props.tableHeader?.map((x) => x.title);
  const tableObj = props.tableHeader?.map((x) => x.name || x?.names);

  const screenWidth = Native.Dimensions.get("window").width;
  const widthArr = props?.widthArr || [
    screenWidth * 0.3,
    screenWidth * 0.25,
    screenWidth * 0.25,
    screenWidth * 0.2,
  ];

  if (props.loading) {
    return <Native.ActivityIndicator color="green" />;
  }

  if (props.loading === false && props.dataSource?.length === 0) {
    return (
      <Native.View>
        <Native.Text>empty</Native.Text>
      </Native.View>
    );
  }

  return (
    <Native.View style={styles.container}>
      <Native.ScrollView horizontal={true}>
        <Native.View>
          {/* remdering header */}
          <Table borderStyle={{ borderWidth: 1, borderColor: "#d1d5db" }}>
            <Row
              isHeader
              data={tableHeader}
              widthArr={widthArr}
              style={[styles.header]}
              className="text-center font-500 text-gray-700"
            />
          </Table>

          <Native.ScrollView
            style={styles.dataWrapper}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Table borderStyle={{ borderWidth: 1, borderColor: "#d1d5db" }}>
              {props.dataSource?.map?.((rowData, index) => (
                <Native.TouchableOpacity
                  disabled={!props.isRowPressAble}
                  onPress={() => props.onPressRow?.(rowData)}
                  key={index}
                >
                  <Row
                    {...props}
                    key={index}
                    index={index}
                    rowData={rowData}
                    // code name -iig zalgaj haruulah bol
                    data={tableObj.map?.(
                      (x) =>
                        (x?.length && x?.map?.((i) => rowData[i] + " ")) ||
                        rowData[x]
                    )}
                    widthArr={widthArr}
                    style={[
                      styles.row,
                      {
                        backgroundColor:
                          rowData.color || (index % 2 && "#e4e4e7"),
                      },
                    ]}
                    onCheckRow={props?.onCheckRow}
                    textStyle={[styles.text]}
                    tableHeader={props.tableHeader}
                  />
                </Native.TouchableOpacity>
              ))}
            </Table>
          </Native.ScrollView>
        </Native.View>
      </Native.ScrollView>
    </Native.View>
  );
};

const styles = Native.StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", borderRadius: 10 },
  header: { height: 40, backgroundColor: "#e4e4e7" },
  text: { textAlign: "left" },
  dataWrapper: { marginTop: -1 },
  row: { backgroundColor: "#fff" },
});
