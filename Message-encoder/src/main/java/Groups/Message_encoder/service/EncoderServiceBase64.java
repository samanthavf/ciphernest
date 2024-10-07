package Groups.Message_encoder.service;

import java.util.Base64;

import org.springframework.stereotype.Service;

import Groups.Message_encoder.model.TextModel;


@Service
public class EncoderServiceBase64 {

	public TextModel toBase64(TextModel txt) {
		Base64.Encoder encoder = Base64.getEncoder();
		String encodeText = encoder.encodeToString(txt.getText().getBytes());
		 
		return new TextModel(encodeText);
	}
	
	public TextModel fromBase64(TextModel txt) {
		if (txt != null) {
			byte[] decodedBytes = Base64.getDecoder().decode(txt.getText());
			String decodedString = new String(decodedBytes);
			
			return new TextModel(decodedString);
		}else {
			throw new IllegalArgumentException("Erro ao decodificar a string Base64");
		}
		}
}
