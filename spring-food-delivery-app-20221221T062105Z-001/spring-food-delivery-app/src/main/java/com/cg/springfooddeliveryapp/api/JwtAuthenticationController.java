package com.cg.springfooddeliveryapp.api;


	import com.cg.springfooddeliveryapp.config.JwtTokenUtil;
	import com.cg.springfooddeliveryapp.dto.LoginDto;
	import com.cg.springfooddeliveryapp.secure.JwtRequest;
	import com.cg.springfooddeliveryapp.secure.JwtResponse;
	import com.cg.springfooddeliveryapp.service.JwtUserDetailsService;

	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.http.ResponseEntity;
	import org.springframework.security.authentication.AuthenticationManager;
	import org.springframework.security.authentication.BadCredentialsException;
	import org.springframework.security.authentication.DisabledException;
	import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
	import org.springframework.security.core.userdetails.UserDetails;
	import org.springframework.web.bind.annotation.*;

	@RestController
	@CrossOrigin
	public class JwtAuthenticationController {

		@Autowired
		private AuthenticationManager authenticationManager;

		@Autowired
		private JwtTokenUtil jwtTokenUtil;

		@Autowired
		private JwtUserDetailsService userDetailsService;

		@RequestMapping(value = "/login", method = RequestMethod.POST)
		public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

			authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

			final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

			final String token = jwtTokenUtil.generateToken(userDetails);

			return ResponseEntity.ok(new JwtResponse(token));
		}

		@RequestMapping(value = "/register", method = RequestMethod.POST)
		public ResponseEntity<?> saveUser(@RequestBody LoginDto user) throws Exception {
			return ResponseEntity.ok(userDetailsService.save(user));
		}

		private void authenticate(String username, String password) throws Exception {
			try {
				authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
			} catch (DisabledException e) {
				throw new Exception("USER_DISABLED", e);
			} catch (BadCredentialsException e) {
				throw new Exception("INVALID_CREDENTIALS", e);
			}
		}
	}


