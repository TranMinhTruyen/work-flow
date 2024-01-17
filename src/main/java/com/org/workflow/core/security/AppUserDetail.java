package com.org.workflow.core.security;

import com.org.workflow.dao.entity.AppUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
public class AppUserDetail implements UserDetails {
  
  private AppUser appUser;
  
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    List<GrantedAuthority> authorities = new ArrayList<>();
    
    if (appUser.getRole() != null && !StringUtils.isBlank(appUser.getRole())) {
      authorities.add(new SimpleGrantedAuthority(appUser.getRole()));
    }
    
    return authorities;
  }

  @Override
  public String getPassword() {
    return appUser.getLoginPassword();
  }

  @Override
  public String getUsername() {
    return appUser.getUsername();
  }

  @Override
  public boolean isEnabled() {
    return appUser.getIsActive();
  }
}
