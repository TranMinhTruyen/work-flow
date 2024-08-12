package com.org.workflow.core.security;

import com.org.workflow.dao.document.UserAccount;
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

  private UserAccount userAccount;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    List<GrantedAuthority> authorities = new ArrayList<>();

    if (userAccount.getRole() != null && !StringUtils.isBlank(userAccount.getRole())) {
      authorities.add(new SimpleGrantedAuthority(userAccount.getRole()));
    }

    if (userAccount.getAuthorities() != null && !userAccount.getAuthorities().isEmpty()) {
      for (String authority : userAccount.getAuthorities()) {
        authorities.add(new SimpleGrantedAuthority(authority));
      }
    }

    return authorities;
  }

  @Override
  public String getPassword() {
    return userAccount.getPassword();
  }

  @Override
  public String getUsername() {
    return userAccount.getUserName();
  }

  @Override
  public boolean isEnabled() {
    return userAccount.getIsActive();
  }

}
