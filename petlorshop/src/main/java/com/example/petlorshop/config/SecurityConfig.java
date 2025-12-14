package com.example.petlorshop.config;

import com.example.petlorshop.models.Role;
import com.example.petlorshop.repositories.NguoiDungRepository;
import com.example.petlorshop.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final NguoiDungRepository nguoiDungRepository;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(NguoiDungRepository nguoiDungRepository, @Lazy JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.nguoiDungRepository = nguoiDungRepository;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> nguoiDungRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/san-pham/**", "/api/dich-vu/**", "/api/danh-muc-san-pham/**").permitAll()

                        // Admin-only endpoints
                        .requestMatchers(HttpMethod.POST, "/api/san-pham", "/api/dich-vu", "/api/nhan-vien", "/api/danh-muc-san-pham").hasRole(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.PUT, "/api/san-pham/**", "/api/dich-vu/**", "/api/nhan-vien/**", "/api/danh-muc-san-pham/**").hasRole(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.DELETE, "/api/san-pham/**", "/api/dich-vu/**", "/api/nhan-vien/**", "/api/danh-muc-san-pham/**").hasRole(Role.ADMIN.name())
                        .requestMatchers("/api/nhan-vien/**").hasRole(Role.ADMIN.name())

                        // User and Admin endpoints
                        .requestMatchers("/api/don-hang/**", "/api/lich-hen/**", "/api/thu-cung/**").authenticated()
                        
                        // **FIX: Add rule for Cart API**
                        .requestMatchers("/api/gio-hang/**").authenticated()

                        // Any other request must be authenticated
                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
