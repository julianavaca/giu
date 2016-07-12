package com.turner.utils;

import com.turner.configuration.MediaAuthorities;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Created by biandra on 21/03/16.
 */
public class AuthoritiesUtils {

    private AuthoritiesUtils() {
        //private constructor
    }

    public static boolean hasRole(MediaAuthorities mediaAuthorities){
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .stream()
                .filter(grantedAuthority -> grantedAuthority.getAuthority().equals(mediaAuthorities.getFullRole()))
                .findAny().isPresent();
    }
}
