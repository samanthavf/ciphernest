package Groups.Message_encoder.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Groups.Message_encoder.service.EncoderService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/translate")
public class EncoderController {
	private final EncoderService service;
	
	@PostMapping("/encodeBase64")
	public ResponseEntity<String> encodeBase64(@RequestBody String text) {
	String codifica = service.toBase64(text);
	return ResponseEntity.ok(codifica);
	}
	
	@PostMapping("/decodeBase64")
	public ResponseEntity<String> decodeBase64(@RequestBody String text){
		String decodifica = service.fromBase64(text);
		return ResponseEntity.ok(decodifica);
	}
}
