package com.org.workflow.core.config;

import com.org.workflow.core.exception.CustomAuthenticationEntryPoint;
import com.org.workflow.core.security.JwtFilter;
import com.org.workflow.core.security.JwtProvider;
import com.org.workflow.service.AppUserService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

  private final JwtProvider jwtProvider;

  private final AppUserService appUserService;

  private static final String[] WHITE_LIST = {"/v3/api-docs/**", "/swagger-ui/**",
      "/swagger-ui.html", "/api/app-user/login", "/api/app-user/create"};

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12);
  }

  @Bean
  public JwtFilter jwtAuthenticationFilter() {
    return new JwtFilter(jwtProvider, appUserService);
  }

  @Bean
  public AuthenticationManager authenticationManager(AppUserService appUserService) {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(appUserService);
    authProvider.setPasswordEncoder(passwordEncoder());
    List<AuthenticationProvider> providers = List.of(authProvider);
    return new ProviderManager(providers);
  }

  @Bean
  public AuthenticationEntryPoint authenticationEntryPoint() {
    return new CustomAuthenticationEntryPoint();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable).exceptionHandling(
            exception -> exception.authenticationEntryPoint(authenticationEntryPoint()))
        .formLogin(login -> login.loginPage("/login").permitAll()).logout(
            logout -> logout.logoutUrl("/api/app-user/logout").invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")).sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(
            auth -> auth.requestMatchers(HttpMethod.GET).permitAll().requestMatchers(WHITE_LIST)
                .permitAll().anyRequest().authenticated())
        .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }

}
