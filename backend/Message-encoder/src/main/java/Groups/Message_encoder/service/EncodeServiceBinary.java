package Groups.Message_encoder.service;

import java.io.ByteArrayOutputStream;

import org.springframework.stereotype.Service;

import Groups.Message_encoder.model.TextModel;

@Service
public class EncodeServiceBinary {

	public TextModel toBinary(TextModel txt) {
		byte[] bytes = txt.getText().getBytes();
		StringBuilder binary = new StringBuilder();
		for (byte b : bytes) {
			int val = b;
		for (int i = 0; i < 8; i++) {
		binary.append((val & 128)==0?0:1);	
		val <<= 1;
		}
		binary.append(" ");
		}
		return new TextModel(binary.toString().trim());
	}

	public TextModel fromBinary(TextModel binary) {
		String[] bytes = binary.getText().split(" ");
		ByteArrayOutputStream byteArray = new ByteArrayOutputStream();
		
		for (String byteStr : bytes) {
			int charCode = Integer.parseInt(byteStr, 2);
			byteArray.write(charCode);
		}
		try {
		return new TextModel(byteArray.toString("UTF-8"));	
		} catch (Exception e) {
			throw new IllegalArgumentException("UTF-8 encoding not supported", e);
		}
	}
}
