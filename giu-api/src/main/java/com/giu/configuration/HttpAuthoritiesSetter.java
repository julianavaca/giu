package com.turner.configuration;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import java.util.EnumSet;

/**
 * Created by luke on 12/02/16.
 */
public class HttpAuthoritiesSetter {

    public static void addAuthorities(HttpSecurity httpSecurity) throws Exception {

        EnumSet.allOf(MediaAuthorities.class).forEach(url -> {
            try {
                httpSecurity
                        .authorizeRequests()
                        .antMatchers(HttpMethod.valueOf(url.getMethod()), url.getUrl())
                        .hasRole(url.getRole());
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
        });

        httpSecurity
                .anonymous()
                .authorities("ROLE_ANONYMOUS");

    }


}
