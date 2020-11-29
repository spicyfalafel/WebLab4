package ru.itmo.angry.beavers.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http
                    // disabling the CSRF - Cross Site Request Forgery
                    .csrf().disable()
                    // turn on authorization
                    .authorizeRequests()
                    // urls for every guest, others not permitted
                    .antMatchers("/register", "/login","/logout").permitAll()
                    // for every non-guest url require authorization
                    .anyRequest()
                    .authenticated()
                .and()
                    .logout()
                    .permitAll()
                .and()
                // enabling the basic authentication
                    .httpBasic();
        // also there could be mapping for login page, but we use angular
    }


    // this one configures authentication manager and tells it where to find login, password & active fields
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .passwordEncoder(passwordEncoder)
                .usersByUsernameQuery("select login, hash_pass, active from users where login=?")
                //helps spring to get users list with their roles
                .authoritiesByUsernameQuery("select u.login, ur.roles from users u " +
                        "inner join user_role ur " +
                        "on u.id = ur.user_id " +
                        "where u.login=?");
    }
}

