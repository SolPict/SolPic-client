import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";
import useClientStore from "@/store/store";

interface ConfirmModalProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  onConfirm: () => void;
  title?: string;
  message: string;
}

export default function ConfirmModal({
  modalVisible,
  setModalVisible,
  onConfirm,
  title = "확인",
  message,
}: ConfirmModalProps) {
  const { language } = useClientStore().getClientStatus();

  const handleYes = () => {
    onConfirm();
    setModalVisible(false);
  };

  const handleNo = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleNo}
    >
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPress={handleNo}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalMessage}>{message}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleYes}>
                <Text style={styles.buttonText}>
                  {language === "한국어" ? "예" : "Yes"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleNo}>
                <Text style={styles.buttonText}>
                  {language === "한국어" ? "아니요" : "No"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});
