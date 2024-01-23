package com.org.workflow.core.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@AllArgsConstructor
public class CustomUserDetail implements UserDetails {

  private AppUserDetail appUserDetail;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    List<GrantedAuthority> authorities = new ArrayList<>();

    if (appUserDetail.getRole() != null && !StringUtils.isBlank(appUserDetail.getRole())) {
      authorities.add(new SimpleGrantedAuthority(appUserDetail.getRole()));
    }

    if (appUserDetail.getAuthorities() != null && !appUserDetail.getAuthorities().isEmpty()) {
      for (String authority : appUserDetail.getAuthorities()) {
        authorities.add(new SimpleGrantedAuthority(authority));
      }
    }

    return authorities;
  }

  @Override
  public String getPassword() {
    return appUserDetail.getLoginPassword();
  }

  @Override
  public String getUsername() {
    return appUserDetail.getUsername();
  }

  @Override
  public boolean isEnabled() {
    return appUserDetail.getIsActive();
  }

}
