package com.sag.cloud.appswitch.app2.repository;

import com.sag.cloud.appswitch.app2.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
