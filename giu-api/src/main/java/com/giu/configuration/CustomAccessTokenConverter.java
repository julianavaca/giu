package com.turner.configuration;

import com.turner.filter.EnterpriseContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter;

import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by mbritez on 16/02/16.
 */
public class CustomAccessTokenConverter extends DefaultAccessTokenConverter {

    public static final String ROLE_FORMAT = "ROLE_%s";
    public static final String ROLE_REPLACEMENT = "ROLE_";

    public OAuth2Authentication extractAuthentication(Map<String, ?> map) {
        return getAuth(
                Optional.ofNullable(super.extractAuthentication(map)),
                Optional.ofNullable(EnterpriseContext.getEnterprise()));
    }

    private OAuth2Authentication getAuth(
            Optional<OAuth2Authentication> currentAuth,
            Optional<Long> enterprise) {

        OAuth2Authentication auth = currentAuth.get();
        Collection<GrantedAuthority> authorities = auth.getAuthorities();
        return new OAuth2Authentication(
                auth.getOAuth2Request(),
                new UsernamePasswordAuthenticationToken(
                        auth.getPrincipal(),
                        auth.getCredentials(),
                        getAuthorities(authorities, enterprise.orElse(getDefaultEnterprise(authorities)))));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(
            Collection<GrantedAuthority> authorities,
            Long enterprise) {
        return authorities
                .stream()
                .filter(it -> enterprise.equals(extractEnterprise(it)))
                .map(it -> extractRole(it.getAuthority()))
                .collect(Collectors.toSet());
    }

    private SimpleGrantedAuthority extractRole(String authority) {
        String content = authority.replaceAll(ROLE_REPLACEMENT, "");
        return new SimpleGrantedAuthority(String.format(ROLE_FORMAT, content.split("-")[1]));
    }

    private Long extractEnterprise(GrantedAuthority authority) {
        return Long.parseLong(authority.getAuthority().replaceAll(ROLE_REPLACEMENT, "").split("-")[0]);
    }

    private Long getDefaultEnterprise(Collection<GrantedAuthority> authorities) {
        return extractEnterprise(authorities.stream().findFirst().get());
    }
}
