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
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
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
                .or(() -> nguoiDungRepository.findBySoDienThoai(username))
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
        String admin = "ROLE_" + Role.ADMIN.name();
        String doctor = "ROLE_" + Role.DOCTOR.name();
        String receptionist = "ROLE_" + Role.RECEPTIONIST.name();
        String spa = "ROLE_" + Role.SPA.name();

        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/ws/**").permitAll()

                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()

                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/search/**").permitAll()
                        .requestMatchers("/uploads/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/san-pham/**", "/api/dich-vu/**", "/api/danh-muc-san-pham/**", "/api/danh-muc-dich-vu/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/don-hang/guest", "/api/don-hang/tinh-phi-ship").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/khuyen-mai/kiem-tra").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/don-hang/ly-do-huy", "/api/lich-hen/ly-do-huy").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/lich-hen/guest").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/bai-viet/cong-khai", "/api/bai-viet/danh-muc/**", "/api/bai-viet/{id}", "/api/bai-viet/slug/**", "/api/bai-viet/{id}/lien-quan").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/danh-gia/san-pham/**").permitAll()

                        .requestMatchers("/api/nguoi-dung/me/**").authenticated()
                        .requestMatchers("/api/lich-hen/me/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/lich-hen/me").authenticated()
                        .requestMatchers("/api/thu-cung/me/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/thu-cung/me").authenticated()

                        .requestMatchers("/api/lich-hen/doctor/**").hasAnyAuthority(doctor, spa, admin)
                        .requestMatchers("/api/so-tiem-chung/**").hasAnyAuthority(doctor, admin)
                        .requestMatchers(HttpMethod.GET, "/api/nhan-vien/*/lich-trong").authenticated()
                        
                        .requestMatchers(HttpMethod.GET, "/api/nhan-vien/*/dashboard-stats").hasAnyAuthority(doctor, spa, admin)
                        .requestMatchers(HttpMethod.GET, "/api/nhan-vien/*/check-availability").authenticated()

                        .requestMatchers("/api/lich-hen/today").hasAnyAuthority(receptionist, admin)
                        .requestMatchers(HttpMethod.POST, "/api/lich-hen/receptionist").hasAnyAuthority(receptionist, admin)
                        .requestMatchers("/api/don-thuoc/**").hasAnyAuthority(doctor, receptionist, admin)
                        .requestMatchers(HttpMethod.POST, "/api/don-hang/tu-don-thuoc/**").hasAnyAuthority(receptionist, admin)

                        .requestMatchers(HttpMethod.POST, "/api/bai-viet/**").hasAnyAuthority(admin, receptionist)
                        .requestMatchers(HttpMethod.PUT, "/api/bai-viet/**").hasAnyAuthority(admin, receptionist)
                        .requestMatchers(HttpMethod.DELETE, "/api/bai-viet/**").hasAnyAuthority(admin, receptionist)

                        .requestMatchers("/api/admin/**").hasAuthority(admin)
                        .requestMatchers("/api/nguoi-dung/**").hasAuthority(admin)
                        .requestMatchers("/api/nhan-vien/**").hasAuthority(admin)
                        .requestMatchers("/api/nha-cung-cap/**").hasAuthority(admin)
                        .requestMatchers("/api/cua-hang/**").hasAuthority(admin)
                        .requestMatchers(HttpMethod.GET, "/api/danh-gia").hasAuthority(admin)

                        .requestMatchers(HttpMethod.POST, "/api/san-pham", "/api/dich-vu", "/api/danh-muc-san-pham", "/api/danh-muc-dich-vu").hasAuthority(admin)
                        .requestMatchers(HttpMethod.PUT, "/api/san-pham/**", "/api/dich-vu/**", "/api/danh-muc-san-pham/**", "/api/danh-muc-dich-vu/**").hasAuthority(admin)
                        .requestMatchers(HttpMethod.DELETE, "/api/san-pham/**", "/api/dich-vu/**", "/api/danh-muc-san-pham/**", "/api/danh-muc-dich-vu/**").hasAuthority(admin)

                        .requestMatchers(HttpMethod.PUT, "/api/don-hang/**").hasAnyAuthority(admin,receptionist)
                        .requestMatchers(HttpMethod.GET, "/api/lich-hen/**").hasAuthority(admin)
                        .requestMatchers(HttpMethod.PUT, "/api/lich-hen/**").hasAuthority(admin)

                        .requestMatchers(HttpMethod.GET, "/api/nhan-vien/**").authenticated()
                        .requestMatchers("/api/thu-cung/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/don-hang").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/lich-hen").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/don-hang/user/**").authenticated()
                        .requestMatchers("/api/chat/**", "/api/thong-bao/**", "/api/giao-dich/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/danh-gia").authenticated()

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
