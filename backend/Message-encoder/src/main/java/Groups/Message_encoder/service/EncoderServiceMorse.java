package Groups.Message_encoder.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import Groups.Message_encoder.model.TextModel;

@Service
public class EncoderServiceMorse {
	public static final Map<Character, String> morseCodeMap = new HashMap<>();
	public static final Map<String, Character> morseCodeMapReverse = new HashMap<>();
	
	static {
	    morseCodeMap.put('A', ".-");
	    morseCodeMap.put('B', "-...");
        morseCodeMap.put('C', "-.-.");
        morseCodeMap.put('D', "-..");
        morseCodeMap.put('E', ".");
        morseCodeMap.put('F', "..-.");
        morseCodeMap.put('G', "--.");
        morseCodeMap.put('H', "....");
        morseCodeMap.put('I', "..");
        morseCodeMap.put('J', ".---");
        morseCodeMap.put('K', "-.-");
        morseCodeMap.put('L', ".-..");
        morseCodeMap.put('M', "--");
        morseCodeMap.put('N', "-.");
        morseCodeMap.put('O', "---");
        morseCodeMap.put('P', ".--.");
        morseCodeMap.put('Q', "--.-");
        morseCodeMap.put('R', ".-.");
        morseCodeMap.put('S', "...");
        morseCodeMap.put('T', "-");
        morseCodeMap.put('U', "..-");
        morseCodeMap.put('V', "...-");
        morseCodeMap.put('W', ".--");
        morseCodeMap.put('X', "-..-");
        morseCodeMap.put('Y', "-.--");
        morseCodeMap.put('Z', "--..");
        morseCodeMap.put('0', "-----");
        morseCodeMap.put('1', ".----");
        morseCodeMap.put('2', "..---");
        morseCodeMap.put('3', "...--");
        morseCodeMap.put('4', "....-");
        morseCodeMap.put('5', ".....");
        morseCodeMap.put('6', "-....");
        morseCodeMap.put('7', "--...");
        morseCodeMap.put('8', "---..");
        morseCodeMap.put('9', "----.");
        morseCodeMap.put(' ', "/");
        
        morseCodeMap.put('Á', ".--.-");
        morseCodeMap.put('É', "..-..");
        morseCodeMap.put('Í', "..-..");
        morseCodeMap.put('Ó', "---.");
        morseCodeMap.put('Ú', "..--");
        morseCodeMap.put('Ã', ".--.-");
        morseCodeMap.put('Õ', "---.");
        morseCodeMap.put('Ç', "-.-..");
        
        morseCodeMap.put(',', "--..--");  
        morseCodeMap.put('.', ".-.-.-");  
        morseCodeMap.put('?', "..--..");  
        morseCodeMap.put('!', "-.-.--");  
        morseCodeMap.put(':', "---...");  
        morseCodeMap.put(';', "-.-.-."); 
}

    static {
	morseCodeMapReverse.put(".-", 'A');
        morseCodeMapReverse.put("-...", 'B');
        morseCodeMapReverse.put("-.-.", 'C');
        morseCodeMapReverse.put("-..", 'D');
        morseCodeMapReverse.put(".", 'E');
        morseCodeMapReverse.put("..-.", 'F');
        morseCodeMapReverse.put("--.", 'G');
        morseCodeMapReverse.put("....", 'H');
        morseCodeMapReverse.put("..", 'I');
        morseCodeMapReverse.put(".---", 'J');
        morseCodeMapReverse.put("-.-", 'K');
        morseCodeMapReverse.put(".-..", 'L');
        morseCodeMapReverse.put("--", 'M');
        morseCodeMapReverse.put("-.", 'N');
        morseCodeMapReverse.put("---", 'O');
        morseCodeMapReverse.put(".--.", 'P');
        morseCodeMapReverse.put("--.-", 'Q');
        morseCodeMapReverse.put(".-.", 'R');
        morseCodeMapReverse.put("...", 'S');
        morseCodeMapReverse.put("-", 'T');
        morseCodeMapReverse.put("..-", 'U');
        morseCodeMapReverse.put("...-", 'V');
        morseCodeMapReverse.put(".--", 'W');
        morseCodeMapReverse.put("-..-", 'X');
        morseCodeMapReverse.put("-.--", 'Y');
        morseCodeMapReverse.put("--..", 'Z');
        morseCodeMapReverse.put("-----", '0');
        morseCodeMapReverse.put(".----", '1');
        morseCodeMapReverse.put("..---", '2');
        morseCodeMapReverse.put("...--", '3');
        morseCodeMapReverse.put("....-", '4');
        morseCodeMapReverse.put(".....", '5');
        morseCodeMapReverse.put("-....", '6');
        morseCodeMapReverse.put("--...", '7');
        morseCodeMapReverse.put("---..", '8');
        morseCodeMapReverse.put("----.", '9');
        morseCodeMapReverse.put("/", ' '); // Espaço entre palavras
        morseCodeMapReverse.put(".-.-.-", '.'); // Ponto
        morseCodeMapReverse.put("--..--", ','); // Vírgula
        morseCodeMapReverse.put("..--..", '?'); // Ponto de interrogação
        morseCodeMapReverse.put("-.-.--", '!'); // Exclamação
        morseCodeMapReverse.put(".--.-", 'Á'); // A com acento
        morseCodeMapReverse.put("..-..", 'É'); // E com acento
        morseCodeMapReverse.put("---.", 'Ó'); // O com acento
        morseCodeMapReverse.put("..--", 'Ú'); // U com acento
        morseCodeMapReverse.put(".--.-", 'Á'); // A com til
        morseCodeMapReverse.put("---.", 'Õ'); // O com til
        morseCodeMapReverse.put("-.-..", 'Ç'); // C com cedilha
}
	
	public TextModel toMorse(TextModel txt) {
		StringBuilder morse = new StringBuilder();
		String texto = txt.getText().toUpperCase();
		
		for (char c : texto.toCharArray()) {
			String morseCode = morseCodeMap.get(c);
			if (morseCode != null) {
				morse.append(morseCode).append(" ");
			}else {
				morse.append("? ");
			}
		}
		return new TextModel(morse.toString().trim());
	}

	
	public TextModel fromMorse(TextModel txt) {
		StringBuilder decoded = new StringBuilder();
		String[] morseWords = txt.getText().split(" / "); 
        for (String word : morseWords) {
            String[] morseChars = word.split(" "); 
            for (String code : morseChars) {
                Character character = morseCodeMapReverse.get(code);
                if (character != null) {
                    decoded.append(character);
                } else {
                    decoded.append('?'); 
                }
            }
            decoded.append(" "); 
        }
        return new TextModel(decoded.toString().trim());
	}
}
