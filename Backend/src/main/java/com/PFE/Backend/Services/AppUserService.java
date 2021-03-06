package com.PFE.Backend.Services;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.PFE.Backend.Enum.AppUserRole;
import com.PFE.Backend.Repository.AppUserRepository;
import com.PFE.Backend.Services.helpers.EmailSender;
import com.PFE.Backend.entities.AppUser;
import com.PFE.Backend.entities.ConfirmationToken;
import com.PFE.Backend.entities.ModifyPasswordRequest;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;



@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService  {

	 private final static String USER_NOT_FOUND_MSG =
	            "user with email %s not found";

	 private final AppUserRepository appUserRepository;
	 private final BCryptPasswordEncoder bCryptPasswordEncoder;
	 private final ConfirmationTokenService confirmationTokenService;
	 private final EmailValidatorService emailValidator;
	 private final EmailSender emailSender;
	 
	 
	  @Override
	    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		  return appUserRepository.findByEmail(email)
	                .orElseThrow(() ->
	                        new UsernameNotFoundException(
	                                String.format(USER_NOT_FOUND_MSG, email)));
	    }
	  
	  
	  public String signUpUser(AppUser appUser) {
		    System.out.println("-------------"+appUser.getEmail());
		   boolean userExists = appUserRepository.findByEmail(appUser.getEmail())
	                                             .isPresent();

	        if (userExists) {
	            //  check of attributes are the same and
	            // if email not confirmed send confirmation email.
	        	  AppUser appUserOld = appUserRepository.findByEmail(appUser.getEmail()).get();
	              Boolean enabled = appUserOld.getEnabled();

	              if (!enabled) {

	                  String token = UUID.randomUUID().toString();

	                  saveConfirmationToken(appUserOld, token);

	                  return token;
	              }

	            throw new IllegalStateException("email already taken");
	        }
	        
	        String encodedPassword = bCryptPasswordEncoder
	                .encode(appUser.getPassword());
	        appUser.setPassword(encodedPassword);
	        appUserRepository.save(appUser);
	        
            //Send Confirmation Token to user
            String token = UUID.randomUUID().toString();
            saveConfirmationToken(appUser, token);

            return token;
        }

        private void saveConfirmationToken(AppUser appUser, String token) {

            ConfirmationToken confirmationToken = new ConfirmationToken(
                    token,
                    LocalDateTime.now(),
                    LocalDateTime.now().plusMinutes(15),
                    appUser
            );
            
            confirmationTokenService.saveConfirmationToken(confirmationToken);
           
	  }
	  
	  public int enableAppUser(String email) {
	        return appUserRepository.enableAppUser(email);
	    }


	public Optional<AppUser> findByEmail(String email) {
		// TODO Auto-generated method stub
		return appUserRepository.findByEmail(email);
	}


	public String ResetPassword(String email) {;
		  String string = email.replaceAll("^\"|\"$", "");
		  System.out.println(string);
		  AppUser appUserOld = appUserRepository.findByEmail(string).get();
		  String token = UUID.randomUUID().toString().substring(0, 7);
		  String encodedPassword = bCryptPasswordEncoder
	                .encode(token);
		  appUserOld.setPassword(encodedPassword);
		  appUserRepository.save(appUserOld);
	      emailSender.send( email,buildEmail(email, token));
	      
	     return email;
	}
	public String ModifyPassword(ModifyPasswordRequest modifyRequest) {
		
		String email = modifyRequest.getEmail();
		String password = modifyRequest.getPassword();
		String ancienpassword = modifyRequest.getAncienpassword();
		AppUser appUserOld = appUserRepository.findByEmail(email).get();
		boolean test = bCryptPasswordEncoder.matches(ancienpassword, appUserOld.getPassword());
		if (test) {
			String encodedPassword = bCryptPasswordEncoder.encode(password);
			appUserOld.setPassword(encodedPassword);
			appUserRepository.save(appUserOld);
			System.out.println("changed");
			return "true";
		}
		
		return "false";
	}
	  
	
	 private String buildEmail(String name, String link) {
	        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
	                "\n" +
	                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
	                "\n" +
	                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
	                "    <tbody><tr>\n" +
	                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
	                "        \n" +
	                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
	                "          <tbody><tr>\n" +
	                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
	                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
	                "                  <tbody><tr>\n" +
	                "                    <td style=\"padding-left:10px\">\n" +
	                "                  \n" +
	                "                    </td>\n" +
	                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
	                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Reset your Password</span>\n" +
	                "                    </td>\n" +
	                "                  </tr>\n" +
	                "                </tbody></table>\n" +
	                "              </a>\n" +
	                "            </td>\n" +
	                "          </tr>\n" +
	                "        </tbody></table>\n" +
	                "        \n" +
	                "      </td>\n" +
	                "    </tr>\n" +
	                "  </tbody></table>\n" +
	                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
	                "    <tbody><tr>\n" +
	                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
	                "      <td>\n" +
	                "        \n" +
	                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
	                "                  <tbody><tr>\n" +
	                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
	                "                  </tr>\n" +
	                "                </tbody></table>\n" +
	                "        \n" +
	                "      </td>\n" +
	                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
	                "    </tr>\n" +
	                "  </tbody></table>\n" +
	                "\n" +
	                "\n" +
	                "\n" +
	                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
	                "    <tbody><tr>\n" +
	                "      <td height=\"30\"><br></td>\n" +
	                "    </tr>\n" +
	                "    <tr>\n" +
	                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
	                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
	                "        \n" +
	                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Bonjour " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Votre nouveau password est :</p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> " + link + " </p></blockquote>\n Merci de channger ce mot de passe le plutot possible. <p>See you soon</p>" +
	                "        \n" +
	                "      </td>\n" +
	                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
	                "    </tr>\n" +
	                "    <tr>\n" +
	                "      <td height=\"30\"><br></td>\n" +
	                "    </tr>\n" +
	                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
	                "\n" +
	                "</div></div>";
	    }


	
	  
	  
}
