package Groups.Message_encoder.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import Groups.Message_encoder.model.TextModel;
import Groups.Message_encoder.service.EncodeServiceBinary;
import Groups.Message_encoder.service.EncoderServiceBase64;
import Groups.Message_encoder.service.EncoderServiceMorse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/translate")
@CrossOrigin(origins = "*", methods = {RequestMethod.POST})
public class EncoderController {
	private final EncoderServiceBase64 service;
	private final EncoderServiceMorse morse;
	private final EncodeServiceBinary binary;
	
	@PostMapping("/encodeBase64")
	public ResponseEntity<TextModel> encodeBase64(@RequestBody TextModel text) {
	TextModel codifica = service.toBase64(text);
	return ResponseEntity.ok(codifica);
	}
	
	@PostMapping("/decodeBase64")
	public ResponseEntity<TextModel> decodeBase64(@RequestBody TextModel text){
		TextModel decodifica = service.fromBase64(text);
		return ResponseEntity.ok(decodifica);
	}
	
	@PostMapping("/encodeMorse")
	public ResponseEntity<TextModel> encodeToMorse(@RequestBody TextModel txt){
		TextModel codifica = morse.toMorse(txt);
		return ResponseEntity.ok(codifica);
	}
	
	@PostMapping("/decodeMorse")
	public ResponseEntity<TextModel> decodeFromMorse(@RequestBody TextModel txt){
		TextModel decodifica = morse.fromMorse(txt);
		return ResponseEntity.ok(decodifica);
	}
	
	@PostMapping("/encodeBinary")
	public ResponseEntity<TextModel> toBinary(@RequestBody TextModel txt){	
		TextModel codifica = binary.toBinary(txt);
		return ResponseEntity.ok(codifica);
	}
	
	@PostMapping("/decodeBinary")
	public ResponseEntity<TextModel> fromBinary(@RequestBody TextModel txt){
	    try {
	    	TextModel decodifica = binary.fromBinary(txt);
	        return ResponseEntity.ok(decodifica); 
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	    
	}
  }
}
