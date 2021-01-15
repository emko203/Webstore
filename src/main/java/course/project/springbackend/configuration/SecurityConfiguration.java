package course.project.springbackend.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity()
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    DataSource dataSource;



    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
        auth.jdbcAuthentication().dataSource(dataSource)
                .passwordEncoder(NoOpPasswordEncoder.getInstance())
                .usersByUsernameQuery("select username,password,enabled "
                        + " from user_model "
                        + " where username = ? ")
                .authoritiesByUsernameQuery("select username, role "
                        + " from user_model "
                        + " where username = ? ");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.httpBasic();
        http.formLogin().disable();
        http.authorizeRequests()
                .antMatchers("/product/new").hasAuthority("ADMIN")
                .antMatchers("/product/delete/**").hasAuthority("ADMIN")
                .antMatchers("/product/edit").hasAuthority("ADMIN")
                .antMatchers("/product/").hasAnyAuthority("ADMIN","USER")
                .antMatchers("/product/show/**").hasAnyAuthority("ADMIN","USER")
                .antMatchers("/register").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/").permitAll()
                .and().cors()
                .and().logout()
                .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
                .and().csrf().disable();
    }
}
