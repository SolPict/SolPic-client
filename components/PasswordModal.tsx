import {
  Modal,
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "@/constants/colors";

interface PasswordModalProps {
  visible: boolean;
  password: string;
  setPassword: (text: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PasswordModal({
  visible,
  password,
  setPassword,
  onConfirm,
  onCancel,
}: PasswordModalProps) {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>비밀번호를 입력해주세요</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="비밀번호"
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 320,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: COLORS.PRIMARY,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
