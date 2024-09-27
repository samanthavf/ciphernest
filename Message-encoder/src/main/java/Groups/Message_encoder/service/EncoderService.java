package Groups.Message_encoder.service;

import java.util.Base64;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class EncoderService {

	public String toBase64(String txt) {
		Base64.Encoder encoder = Base64.getEncoder();
		String encodeText = encoder.encodeToString(txt.getBytes());
		 
		return new String(encodeText);
	}
	
	public String fromBase64(String txt) {
		if (txt != null) {
			byte[] decodedBytes = Base64.getDecoder().decode(txt);
	        return new String(decodedBytes);
		}else {
			throw new IllegalArgumentException("Erro ao decodificar a string Base64");
		}
		}
}
